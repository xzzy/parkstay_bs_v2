import json
import re
import datetime
import requests
import logging
from django.conf import settings
#from django.core.urlresolvers import reverse
from django.urls import reverse
from django.http import Http404, HttpResponse, JsonResponse, HttpResponseRedirect
from django.utils import timezone
from datetime import datetime
CHECKOUT_PATH = re.compile('^/ledger-api')
PROCESS_PAYMENT =  re.compile('^/ledger-api/process-payment')
logger = logging.getLogger('log')

BLOCKED_SCRIPTING = [
    "curl",
    "wget",
    "python-requests",
    "python",
    "libwww-perl",
    "scrapy",
    "httpclient",
    "java",
    "okhttp",
    "Go-http-client",
    "axios",
    "PostmanRuntime"
]

class QueueControl(object):

     def __init__(self, get_response):
          self.get_response = get_response

     def __call__(self, request):
          session_key = ''
          if settings.WAITING_QUEUE_ENABLED is True:
               # Required for ledger to send completion signal after payment is received.
               if request.path.startswith('/api/complete_booking/') or request.path.startswith('/api/booking_pricing/') or request.path.startswith('/api/booking_updates/') or request.path.startswith('/status'):
                    response= self.get_response(request)
                    return response
            
               sitequeuesession = request.COOKIES.get('sitequeuesession', None)
               if request.path == '/' or request.path.startswith('/search-availability/information/') or request.path.startswith('/search-availability/campground') or  request.path.startswith('/mybookings') or request.path.startswith('/api/'):

                    try:
                         if 'HTTP_HOST' in request.META:
                              if settings.QUEUE_ACTIVE_HOSTS == request.META.get('HTTP_HOST',''):
                                   if settings.QUEUE_WAITING_URL:
                                        script_exempt_key = request.GET.get('script_exempt_key',None)
                                        browser_agent = ''
                                        if 'HTTP_USER_AGENT' in request.META:
                                             browser_agent = request.META['HTTP_USER_AGENT']
                                             if script_exempt_key == settings.QUEUE_SCRIPT_EXEMPT_KEY:
                                                  pass
                                             else:                                        
                                                  for blocked_script in BLOCKED_SCRIPTING:
                                                       if blocked_script in browser_agent:                                                            
                                                            response =HttpResponse("<script>window.location.replace('"+settings.QUEUE_BACKEND_URL+"/site-queue/waiting-room/"+settings.QUEUE_GROUP_NAME+"/');</script>Redirecting")                                                                                                                        
                                                            return response                                                                                                         

                                        if sitequeuesession is None:
                                             sitequeuesession=''
                                        #  if sitequeuesession is None:
                                        #       print ("QUEUE REDIRECT")
                                        #      #  response =HttpResponse("<script>window.location.replace('"+settings.QUEUE_WAITING_URL+"');</script>Redirecting")
                                        #      #  return response
                                        
                                        #       url = settings.QUEUE_URL+"/api/check-create-session/?session_key="+sitequeuesession+"&queue_group="+settings.QUEUE_GROUP_NAME
                                        #       resp = requests.get(url, data = {}, cookies={},  verify=False)                                    
                                        #  else:
                                        ipaddress = self.get_client_ip(request)
                                        x_real_ip = '0.0.0.0'
                                        if "HTTP_X_REAL_IP" in request.META:
                                             x_real_ip = request.META.get('HTTP_X_REAL_IP')

                                        url = settings.QUEUE_BACKEND_URL+"/api/check-create-session/?session_key="+sitequeuesession+"&queue_group="+settings.QUEUE_GROUP_NAME+"&script_exempt_key="+settings.QUEUE_SCRIPT_EXEMPT_KEY+"&ipaddress="+ipaddress
                                        resp = requests.get(url, data = {}, cookies={},  verify=False, timeout=90)
                                        
                                        queue_json = resp.json()
                                        
                                        if 'queue_full' in queue_json:
                                             if queue_json['queue_full'] is True:
                                                  response =HttpResponse("<script>window.location.replace('"+queue_json['queue_waiting_room_url']+"');</script>Redirecting")
                                                  return response                                                                                          
                                        
                                        if 'session_key' in queue_json:
                                             session_key = queue_json['session_key']
                                        if sitequeuesession !=session_key:
                                             print ("DIFFERENCE SESSION KEY")
                                             print ("CURRENT:"+sitequeuesession+"NEW:"+session_key)
                                             print (queue_json)
                                        status = "Unknown"
                                        if 'status' in queue_json:
                                             status = queue_json['status']
                                             if queue_json['status'] == 'Waiting': 
                                                  #print (queue_json['queue_waiting_room_url'])
                                                  response =HttpResponse("<script>window.location.replace('"+queue_json['queue_waiting_room_url']+"');</script>Redirecting")
                                                  response.set_cookie('sitequeuesession', session_key, max_age=3600, samesite=None, domain=settings.QUEUE_DOMAIN)
                                                  print ('You are waiting : '+str(session_key))
                                                  return response
                                             else:
                                                  print ('Active Session')
                                        http_referer = ''
                                        if "HTTP_REFERER" in request.META:
                                             http_referer = request.META.get('HTTP_REFERER','')
                                        logger.info("Queue Log,{},{},{},{},{},{},{}".format(datetime.now().strftime("%A, %d %b %Y %H:%M:%S"), ipaddress, x_real_ip, browser_agent, http_referer, request.path, status))
                                        # print ("Queue Log,{},{},{},{},{},{},{}".format(datetime.now().strftime("%A, %d %b %Y %H:%M:%S"), ipaddress, x_real_ip, browser_agent, http_referer, request.path, status))
                                                  
                    except Exception as e:
                         print (e)
                         print ("ERROR LOADING QUEUE")
               else:
                    pass
          else:
               pass
          response= self.get_response(request)
          if len(session_key) > 5:
               response.set_cookie('sitequeuesession', session_key, domain=settings.QUEUE_DOMAIN)
          return response
     
     def get_client_ip(self, request):
          x_real_ip = request.META.get('HTTP_X_REAL_IP')
          x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
          x_orignal_forwarded_for =  request.META.get('HTTP_X_ORIGINAL_FORWARDED_FOR')

          if x_orignal_forwarded_for:
               ip = x_orignal_forwarded_for.split(',')[-1].strip()
          elif x_real_ip:
               ip = x_real_ip
          elif x_forwarded_for:
               ip = x_forwarded_for.split(',')[-1].strip()
          else:
               ip = request.META.get('REMOTE_ADDR')
          return ip     

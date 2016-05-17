from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^dashboard/?$', views.DashBoardRoutingView.as_view(), name='home'),
    url(r'^dashboard/customer/?$', views.DashboardOfficerTreeView.as_view(), name='tree_customer'),
    url(r'^dashboard/officer/?$', views.DashboardOfficerTreeView.as_view(), name='tree_officer'),
    url(r'^dashboard/tables/applications/officer/?', views.TableApplicationsOfficerView.as_view(), name='tables_applications_officer'),
    url(r'^dashboard/tables/licences/officer/?', views.TableLicencesOfficerView.as_view(),
        name='tables_licences_officer'),
    url(r'^dashboard/tables/customer/?', views.TableCustomerView.as_view(), name='tables_customer'),
    url(r'^dashboard/tables/assessor/?', views.TableAssessorView.as_view(), name='tables_assessor'),
    url(r'^dashboard/tables/assessor/?', views.TableAssessorView.as_view(), name='assessor'),
    # Applications
    url(r'^dashboard/data/applications/officer/?', views.DataTableApplicationsOfficerView.as_view(),
        name='data_application_officer'),
    url(r'^dashboard/data/applications/customer/?', views.DataTableApplicationCustomerView.as_view(),
        name='data_application_customer'),
    url(r'^dashboard/data/applications/assessor/?', views.DataTableApplicationAssessorView.as_view(),
        name='data_application_assessor'),
    # Licences
    url(r'^dashboard/data/licences/customer/?', views.DataTableLicencesCustomerView.as_view(),
        name='data_licences_customer'),
    url(r'^dashboard/data/licences/officer/?', views.DataTableLicencesOfficerView.as_view(),
        name='data_licences_officer'),
]

<template lang="html" id="booking-picker">
    <div class="row">
        <div class="col-lg-12">
            <div class="well">
                <form class="" name="flsearch">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="where">Where</label>
                                <input type="text" class="form-control" name="where" placeholder="Region, Park"
                                    v-model="value.where">
                            </div>
                        </div>
                        <div class="col-lg-5 col-md-6">
                            <label for="When">When</label>
                            <form class="form-inline" name="when">
                                <div class="form-group">
                                    <input type="text" class="form-control" name="checkin" placeholder="Check In">
                                </div>
                                <div class="form-group">
                                    <label for=""><i class="fa fa-arrow-right hidden-xs"></i></label>
                                    <input type="text" class="form-control" name="checkout" placeholder="Check Out">
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-4 col-md-3">
                            <label for="guest">Guest</label>
                            <form class="form-inline" name="guest">
                                <div class="form-group">
                                    <div class="dropdown">
                                        <input type="text" class="form-control dropdown-toggle" name="guests"
                                            placeholder="Guest" data-bs-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="true" v-model="guestsText">
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                            <li v-for="guest in guestsPicker">
                                                <div class="row">
                                                    <div class="col-sm-8">
                                                        <span class="item">
                                                            {{ guest.amount }} {{ guest.name }} <span
                                                                style="color:#888;font-weight:300;font-size:12px;">{{ guest.description }}</span>
                                                        </span>
                                                        <br /><a href="#" class="text-info"
                                                            v-show="guest.helpText">{{ guest.helpText }}</a>
                                                    </div>
                                                    <div class="pull-right">
                                                        <div class="btn-group btn-group-sm">
                                                            <button type="button" class="btn btn-guest"
                                                                @click.prevent.stop="addGuestCount(guest)"><span
                                                                    class="glyphicon glyphicon-plus"></span></button>
                                                            <button type="button" class="btn btn-guest"
                                                                @click.prevent.stop="removeGuestCount(guest)"><span
                                                                    class="glyphicon glyphicon-minus"></span></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="btn btn-primary" @click.prevent="secondLevelSearch()">
                                        Search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <loader :isLoading="isLoading">{{ loading.join(' , ') }}</loader>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { $ } from '../../hooks.js'
import loader from './loader.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    value: {
        type: Object,
        default: () => ({
                where: "",
                checkin: "",
                checkout: "",
                guests: {
                    adults: 0,
                    concession: 0,
                    children: 0,
                    infants: 0
                }
            })
    }
});

const value = ref(props.value)
const form = ref(null)
const parks = ref([])
const loading = ref([])
const guestsText = ref("")
const guestsPicker = ref([
    {
        id: "adults",
        name: "Adults (no concession)",
        amount: 0,
        description: ""
    },
    {
        id: "concession",
        name: "Concession",
        amount: 0,
        description: "",
        helpText: "accepted concession cards"
    },
    {
        id: "children",
        name: "Children",
        amount: 0,
        description: "Ages 6-16"
    },
    {
        id: "infants",
        name: "Infants",
        amount: 0,
        description: "Ages 0-5"
    },
])

const isLoading = computed(function () {
    return loading.value.length > 0;
})


const addGuestCount = function (guest) {
    guest.amount += 1;
    switch (guest.id) {
        case 'adults':
            value.value.guests.adults = guest.amount;
            break;
        case 'concession':
            value.value.guests.concession = guest.amount;
            break;
        case 'children':
            value.value.guests.children = guest.amount;
            break;
        case 'infants':
            value.value.guests.infants = guest.amount;
            break;
        default:

    }
    generateGuestCountText();
}
const removeGuestCount = function (guest) {
    guest.amount = (guest.amount > 0) ? guest.amount - 1 : 0;
    switch (guest.id) {
        case 'adults':
            value.value.guests.adults = guest.amount;
            break;
        case 'concession':
            value.value.guests.concession = guest.amount;
            break;
        case 'children':
            value.value.guests.children = guest.amount;
            break;
        case 'infants':
            value.value.guests.infants = guest.amount;
            break;
        default:

    }
    generateGuestCountText();
}
const generateGuestCountText = function () {
    var text = "";
    $.each(guestsPicker.value, function (i, g) {
        (i != guestsPicker.value.length - 1) ? (g.amount > 0) ? text += g.amount + " " + g.name + ",  " : "" : (g.amount > 0) ? text += g.amount + " " + g.name + " " : "";
    });
    guestsText.value = text.replace(/,\s*$/, "");
}
const secondLevelSearch = function () {
    router.push({
        path: '/map',
        query: {
            search: value.value.where,
            arrival: value.value.checkin,
            depature: value.value.checkout,
            adults: value.value.guests.adults,
            children: value.value.guests.children,
            concession: value.value.guests.concession,
            infants: value.value.guests.infants,
        }
    })
}
onMounted(function () {
    form.value = document.forms.flsearch;
    var checkInEl = document.forms.when.checkin;
    var checkOutEl = document.forms.when.checkout;
    var guest = document.forms.guest.guests;
    var rangepicker = $(checkInEl).daterangepicker({
        autoApply: true,
        minDate: new Date(),
        autoUpdateInput: false,
    });
    rangepicker.on('apply.daterangepicker', function (ev, picker) {
        $(checkInEl).val(picker.startDate.format('ddd MMM Do, YYYY'))
        $(checkOutEl).val(picker.endDate.format('ddd MMM Do, YYYY'));
        value.value.checkin = picker.startDate.format('YYYY/MM/D');
        value.value.checkout = picker.endDate.format('YYYY/MM/D');
    });
})
</script>

<style lang="css" scoped>
.form-control,
.form-group .form-control {
    border: 0;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#009688), to(#009688)), -webkit-gradient(linear, left top, left bottom, from(#D2D2D2), to(#D2D2D2));
    background-image: -webkit-linear-gradient(#009688, #009688), -webkit-linear-gradient(#D2D2D2, #D2D2D2);
    background-image: -o-linear-gradient(#009688, #009688), -o-linear-gradient(#D2D2D2, #D2D2D2);
    background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2);
    -webkit-background-size: 0 2px, 100% 1px;
    background-size: 0 2px, 100% 1px;
    background-repeat: no-repeat;
    background-position: center bottom, center -webkit-calc(100% - 1px);
    background-position: center bottom, center calc(100% - 1px);
    background-color: rgba(0, 0, 0, 0);
    -webkit-transition: background 0s ease-out;
    -o-transition: background 0s ease-out;
    transition: background 0s ease-out;
    float: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0;
}

.form-group .form-control:focus {
    background-image: linear-gradient(#337ab7, #337ab7);
    outline: none;
    background-size: 100% 2px, 100% 1px;
}

#booking-picker .dropdown-menu:before {
    position: absolute;
    top: -12px;
    left: 12px;
    display: inline-block;
    border-right: 12px solid transparent;
    border-bottom: 12px solid #ccc;
    border-left: 12px solid transparent;
    border-bottom-color: rgba(46, 109, 164, 1);
    content: '';
}

#booking-picker .dropdown-menu {
    top: 120%;
    width: 300px;
}

#booking-picker .dropdown-menu li {
    padding: 10px;
    margin-right: 10px;
    border-bottom: 1px solid #ccc;
}

#booking-picker .dropdown-menu li:last-child {
    border-bottom: 0;
}

#booking-picker .dropdown-menu .item {
    line-height: 2;
}

.btn-guest {
    color: #ccc;
    background-color: #fff;
    border-color: #ccc;
}
</style>

<template>
    <div class="home">
        <b-container>
            <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
                <!-- <registration-form-volunteer/> -->
                <registration-closed type="volunteer" />
            </b-card>
        </b-container>
    </div>
</template>

<script>
// import RegistrationFormVolunteer from "../components/RegistrationFormVolunteer.vue";
import RegistrationClosed from "../components/RegistrationClosed.vue"
export default {
    name: "RegisterView",
    // components: { RegistrationFormVolunteer },
    components: { RegistrationClosed },
    props: {
        default_track: {
            type: String,
            default: "general",
        },
    },
};
</script>


Footer

<template>
    <div class="home">
        <b-container>
            <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
                <registration-form-volunteers />
                <!-- <registration-closed /> -->
            </b-card>
        </b-container>
    </div>
</template>

<script>
import RegistrationFormVolunteers from "../components/VolunteerRegistrationPage.vue";
// import RegistrationClosed from "../components/RegistrationClosed.vue"
export default {
    name: "RegisterView",
    components: { RegistetrationFormVolunteers },
    // components: { RegistrationClosed },
    props: {
        default_track: {
            type: String,
            default: "general",
        },
    },
};
</script>


Footer

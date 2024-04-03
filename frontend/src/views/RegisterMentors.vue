<template>
    <div class="home">
        <b-container>
            <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
                <!-- <registration-form-mentor /> -->
                <registration-closed-other />
            </b-card>
        </b-container>
    </div>
</template>

<script>
// import RegistrationFormMentor from "../components/RegistrationFormMentor.vue";
import RegistrationClosedOther from "../components/RegistrationClosedOther.vue"
export default {
    name: "RegisterView",
    // components: { RegistrationFormMentor },
    components: { RegistrationClosedOther },
    props: {
        default_track: {
            type: String,
            default: "general",
        },
    },
};
</script>


Footer

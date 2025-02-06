<template>
    <div class="home">
        <b-container>
            <b-card class="main-card mt-3 mt-lg-4 mt-xxl-5">
                <registration-form-mentor />
                <!-- <registration-closed type="mentor"/> -->
            </b-card>
        </b-container>
    </div>
</template>

<script>
// import RegistrationClosed from "../components/RegistrationClosed.vue"
import RegistrationFormMentor from "../components/RegistrationFormMentor.vue"
export default {
    name: "RegisterView",
    // components: { RegistrationClosed },
    components: { RegistrationFormMentor },
    props: {
        default_track: {
            type: String,
            default: "general",
        },
    },
};
</script>


Footer

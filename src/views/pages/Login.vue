<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/PAMASTER_EN.png')"
              max-height="100px"
              max-width="170px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>
          </router-link>
        </v-card-title>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="ID"
              placeholder="아이디를 입력 해주세요"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="비밀번호를 입력 해주세요"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="아이디저장"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              >
                Forgot Password?
              </a>
            </div>

            <!-- login button -->
            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="userlogin"
            >
              Login
            </v-btn>

            <layer-alert
              v-if="notice"
              :message="message"
              @closeDialog="closeDialog"
            />
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            New on our platform?
          </span>
          <router-link :to="{name:'pages-register'}">
            Create an account
          </router-link>
        </v-card-text>

        <!-- divider -->
        <!-- <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text> -->
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >
  </div>
</template>

<script>
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { login } from '@/api/authentication/auth'
import router from '@/router'

// TODO: layerAlert layout 수정 필요
import LayerAlert from '@/components/ui-components/LayerAlert.vue'

export default {
  components: {
    LayerAlert,
  },

  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')

    return {
      isPasswordVisible,
      email,
      password,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      notice: false,
      message: 'id, password를 확인하세요',
    }
  },

  methods: {
    // user login
    userlogin() {
      const params = {
        usr_id: this.email,
        usr_pw: this.password,
      }

      if (this.email === '' && this.password === '') {
        this.notice = true

        return
      }

      login(params)
        .then(response => {
          console.log('▶ login response', response)
          this.$store.dispatch('userstore/retrieveLogin', response)
          router.push({ path: '/dashboard' })
        })
        .catch(error => {
          console.log(error)
        })
      this.notice = false
    },
    closeDialog() {
      this.notice = false
    },
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

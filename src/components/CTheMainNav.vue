<template>
  <c-sidebar
    class="overflow-auto pt-5"
  >
    <b-list-group>
      <c-main-nav-item
        :label="$t('dashboard:navItem.label')"
        :to="{ name: 'dashboard' }"
        :icon="['fas', 'tachometer-alt']"
      />
    </b-list-group>

    <b-list-group>
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('system:navGroup.label') }}
      </small>

      <c-main-nav-item
        :label="$t('system.users:navItem.label')"
        :to="{ name: 'system.user' }"
        :icon="['fas', 'users']"
      />

      <c-main-nav-item
        :label="$t('system.roles:navItem.label')"
        :to="{ name: 'system.role' }"
        :icon="['fas', 'hat-cowboy']"
      />

      <c-main-nav-item
        :label="$t('system.applications:navItem.label')"
        :to="{ name: 'system.application' }"
        :icon="['fas', 'th-large']"
      />

      <!--
      <c-main-nav-item
        :label="$t('system.scripts:navItem.label')"
        :to="{ name: 'system.script' }"
        :icon="['fas', 'magic']"
      />
      -->

      <c-main-nav-item
        v-if="canReadSettings.system"
        :label="$t('system.settings:navItem.label')"
        :to="{ name: 'system.settings' }"
        :icon="['fas', 'sliders-h']"
      />

      <c-main-nav-item
        v-if="canGrant.system"
        :label="$t('system.permissions:navItem.label')"
        :to="{ name: 'system.permissions' }"
        :icon="['fas', 'lock']"
      />

      <c-main-nav-item
        v-if="canGrant.system"
        :label="$t('system.automation:navItem.label')"
        :to="{ name: 'system.automation' }"
        :icon="['fas', 'cogs']"
      />

      <c-main-nav-item
        v-if="canGrant.system"
        :label="$t('system.actionlog:navItem.label')"
        :to="{ name: 'system.actionlog' }"
        :icon="['fas', 'glasses']"
      />
    </b-list-group>

    <b-list-group
      v-if="canGrant.compose || canReadSettings.compose"
    >
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('compose:navGroup.label') }}
      </small>

      <c-main-nav-item
        v-if="canReadSettings.compose"
        :label="$t('compose.settings:navItem.label')"
        :to="{ name: 'compose.settings' }"
        :icon="['fas', 'sliders-h']"
      />

      <c-main-nav-item
        v-if="canGrant.compose"
        :label="$t('compose.permissions:navItem.label')"
        :to="{ name: 'compose.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>

    <b-list-group
      v-if="canGrant.messaging || canReadSettings.messaging"
    >
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('messaging:navGroup.label') }}
      </small>

      <c-main-nav-item
        v-if="canReadSettings.messaging"
        :label="$t('messaging.settings:navItem.label')"
        :to="{ name: 'messaging.settings' }"
        :icon="['fas', 'sliders-h']"
      />

      <c-main-nav-item
        v-if="canGrant.messaging"
        :label="$t('messaging.permissions:navItem.label')"
        :to="{ name: 'messaging.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>

    <b-list-group
      v-if="canReadSettings.system"
    >
      <small class="ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('ui.one:navGroup.label') }}
      </small>

      <c-main-nav-item
        v-if="canReadSettings.system"
        :label="$t('ui.one.settings:navItem.label')"
        :to="{ name: 'one.settings' }"
        :icon="['fas', 'sliders-h']"
      />
    </b-list-group>
  </c-sidebar>
</template>
<script>
import CMainNavItem from 'corteza-webapp-admin/src/components/CMainNavItem'
import CSidebar from 'corteza-webapp-admin/src/components/CSidebar'

export default {
  components: {
    CSidebar,
    CMainNavItem,
  },

  props: {
    access: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      canGrant: {
        system: false,
        compose: false,
        messaging: false,
      },
      canReadSettings: {
        system: false,
        compose: false,
        messaging: false,
      },
    }
  },

  watch: {
    access: {
      immediate: true,
      handler () {
        ['system', 'compose', 'messaging'].forEach(res => {
          this.canGrant[res] = (this.access.find(({ resource, operation }) => resource === res && operation === 'grant') || {}).allow
          this.canReadSettings[res] = (this.access.find(({ resource, operation }) => resource === res && operation === 'settings.read') || {}).allow
        })
      },
    },
  },
}
</script>

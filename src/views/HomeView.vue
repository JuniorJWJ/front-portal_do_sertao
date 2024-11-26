<template>
	<div>
		<!-- <NavbarNav /> -->
		<Registrese />
		<AboutSection />
		<HowItWorksSection />
		<KeysSectionItem />
		<KeysSectionAccount />
	</div>
</template>

<script>
//   import NavbarNav from "../components/NavbarNav.vue"
import Registrese from '../components/Registrese.vue'
import AboutSection from '../components/AboutSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import KeysSectionAccount from '../components/KeysSectionAccount.vue'
import KeysSectionItem from '../components/KeysSectionItem.vue'

export default {
	name: 'HomeView',
	components: {
		Registrese,
		AboutSection,
		HowItWorksSection,
		KeysSectionItem,
		KeysSectionAccount,
	},
}
</script>

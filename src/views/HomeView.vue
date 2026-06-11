<template>
	<div class="home">
		<HeroSection />
		<AboutSection />
		<HowItWorksSection />
		<FeaturedWorksSection />
		<FeaturedAuthorsSection />
	</div>
</template>

<script>
import HeroSection from '../components/home/HeroSection.vue'
import AboutSection from '../components/home/AboutSection.vue'
import HowItWorksSection from '../components/home/HowItWorksSection.vue'
import FeaturedWorksSection from '../components/home/FeaturedWorksSection.vue'
import FeaturedAuthorsSection from '../components/home/FeaturedAuthorsSection.vue'

export default {
	name: 'HomeView',
	components: {
		HeroSection,
		AboutSection,
		HowItWorksSection,
		FeaturedWorksSection,
		FeaturedAuthorsSection,
	},
}
</script>

<style scoped>
.home {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: var(--space-5);
}
</style>

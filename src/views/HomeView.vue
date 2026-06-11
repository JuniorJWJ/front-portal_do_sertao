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
import HeroSection from '../components/organisms/home/HeroSection.vue'
import AboutSection from '../components/organisms/home/AboutSection.vue'
import HowItWorksSection from '../components/organisms/home/HowItWorksSection.vue'
import FeaturedWorksSection from '../components/organisms/home/FeaturedWorksSection.vue'
import FeaturedAuthorsSection from '../components/organisms/home/FeaturedAuthorsSection.vue'

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

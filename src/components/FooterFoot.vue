<template>
	<footer class="site-footer">
		<div class="footer-inner">
			<img
				src="../assets/Logo_ifba.png"
				alt="Instituto Federal da Bahia"
				loading="lazy"
			/>
			<img
				src="../assets/logo_fapesb.png"
				alt="FAPESB"
				loading="lazy"
			/>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'FooterFoot',
}
</script>

<style scoped>
.site-footer {
	width: 100%;
	margin-top: var(--space-7);
	border-top: 1px solid var(--color-border);
	background: var(--color-surface);
}

.footer-inner {
	width: min(100%, var(--container));
	margin: 0 auto;
	padding: var(--space-5);
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--space-6);
	flex-wrap: wrap;
}

img:first-child {
	width: min(320px, 70vw);
	height: auto;
}

img:last-child {
	width: 100px;
	height: auto;
}
</style>

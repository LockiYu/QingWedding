<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { wedding, type Photo } from './config/wedding'
import { weddingCount } from './utils/date'

const asset = (src: string) => src.startsWith('/images/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src
const now = ref(new Date())
const count = computed(() => weddingCount(wedding.date, now.value))
const cinemaIndex = ref(0)
const preview = ref<Photo | null>(null)
const eggOpen = ref(false)
let clock: number | undefined
let projector: number | undefined
let revealObserver: IntersectionObserver | undefined
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const introVisible = ref(!reduceMotion.matches)
let introTimer: number | undefined
const nextFrame = () => { if (!reduceMotion.matches) cinemaIndex.value = (cinemaIndex.value + 1) % wedding.cinema.length }
function closePreview() { preview.value = null; document.body.style.overflow = '' }
function openPreview(photo: Photo) { if (!photo.src) return; preview.value = photo; document.body.style.overflow = 'hidden' }
function onKey(event: KeyboardEvent) { if (event.key === 'Escape') closePreview() }
onMounted(() => {
  if (introVisible.value) {
    document.body.style.overflow = 'hidden'
    introTimer = window.setTimeout(() => { introVisible.value = false; document.body.style.overflow = '' }, 3000)
  }
  clock = window.setInterval(() => now.value = new Date(), 60_000)
  projector = window.setInterval(nextFrame, 7000)
  window.addEventListener('keydown', onKey)
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver?.unobserve(entry.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal, .story-row, .feature-item').forEach(el => revealObserver?.observe(el))
  }
})
onUnmounted(() => { clearInterval(clock); clearInterval(projector); clearTimeout(introTimer); revealObserver?.disconnect(); window.removeEventListener('keydown', onKey); document.body.style.overflow = '' })
</script>

<template>
  <main>
    <div v-if="introVisible" class="intro" aria-label="正在开启婚礼纪念册">
      <div class="intro-panel intro-panel-left"></div><div class="intro-panel intro-panel-right"></div>
      <div class="intro-content"><span class="intro-kicker">A STORY WRITTEN TOGETHER</span><span class="intro-ornament" aria-hidden="true">✳</span><p class="intro-names">{{ wedding.names[0] }}<span>&</span>{{ wedding.names[1] }}</p><div class="intro-rule"></div><span class="intro-date">SEPTEMBER 30, 2026</span><span class="intro-place">临汾 · 北京 · 烟台</span></div>
    </div>
    <header class="site-header"><span class="brand">THE WEDDING ALBUM <i>✳</i></span><a href="#story">翻开纪念册 <span aria-hidden="true">↗</span></a></header>
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-photo photo-surface" :class="{ 'has-image': wedding.hero.src }"><img v-if="wedding.hero.src" :src="asset(wedding.hero.src)" :alt="wedding.hero.alt" fetchpriority="high"/><div v-else class="placeholder"><span>01 / COVER PHOTO</span><strong>一张属于你们的合照</strong><small>照片待加入</small></div><span class="hero-photo-note">A DAY TO REMEMBER</span></div>
      <div class="hero-copy"><div class="eyebrow">一份写给两个人的纪念册 <span>VOL. 01 — FOREVER</span></div><h1 id="hero-title">{{ wedding.names[0] }}<em>与</em>{{ wedding.names[1] }}</h1><p class="hero-quote">{{ wedding.opening }}</p><p class="hero-subline">从{{ wedding.origins.partnerTwo }}与{{ wedding.origins.partnerOne }}出发，在{{ wedding.origins.meeting }}相遇。</p><div class="hero-bottom"><span>{{ wedding.date ? wedding.date.split('-').map((part, i) => i === 0 ? part : String(Number(part))).join('.') : '婚礼日期待填写' }}<template v-if="wedding.location"> · {{ wedding.location }}</template></span><a href="#story">往下翻阅 <span aria-hidden="true">↓</span></a></div></div>
    </section>

    <section class="meeting-note reveal" aria-label="相遇的城市"><span class="meeting-label">TWO CITIES, ONE STORY</span><div class="meeting-route"><span>{{ wedding.origins.partnerTwo }}</span><i aria-hidden="true">—</i><strong>{{ wedding.origins.meeting }}</strong><i aria-hidden="true">—</i><span>{{ wedding.origins.partnerOne }}</span></div><p>两座故乡，一座相遇的城市。<br/>故事从这里，写向未来。</p></section>

    <section id="story" class="story section-wrap reveal" aria-labelledby="story-title"><div class="section-kicker">CHAPTER ONE <span>01 / 05</span></div><div class="section-heading"><p class="overline">THE STORY OF US</p><h2 id="story-title">关于我们，<br/><i>从这里说起。</i></h2><p>有些日子值得被记住。<br/>一页一页，写成属于你们的故事。</p></div>
      <div class="timeline-wrap"><div class="timeline" tabindex="0" aria-label="爱情故事时间束，左右滑动查看更多节点"><svg class="timeline-vine" viewBox="0 0 2220 310" aria-hidden="true" focusable="false"><path class="vine-main" d="M 22 65 C 125 48, 170 120, 267 105 S 414 34, 512 50 S 650 140, 757 115 S 894 47, 1002 65 S 1140 143, 1247 120 S 1382 35, 1492 55 S 1622 130, 1737 105 S 1870 48, 1982 70 L 2195 70"/><path class="vine-branch" d="M 168 85 C 187 70, 184 49, 204 37 M 425 65 C 443 86, 442 105, 459 117 M 645 92 C 666 73, 666 52, 688 39 M 896 82 C 918 105, 912 125, 936 138 M 1126 95 C 1148 75, 1142 53, 1166 40 M 1375 83 C 1397 107, 1392 128, 1414 140 M 1620 86 C 1643 67, 1642 47, 1662 36 M 1863 88 C 1887 109, 1882 128, 1903 141"/><g class="vine-leaves"><ellipse cx="204" cy="35" rx="10" ry="4" transform="rotate(-34 204 35)"/><ellipse cx="459" cy="118" rx="10" ry="4" transform="rotate(31 459 118)"/><ellipse cx="688" cy="38" rx="10" ry="4" transform="rotate(-34 688 38)"/><ellipse cx="936" cy="139" rx="10" ry="4" transform="rotate(31 936 139)"/><ellipse cx="1166" cy="39" rx="10" ry="4" transform="rotate(-34 1166 39)"/><ellipse cx="1414" cy="141" rx="10" ry="4" transform="rotate(31 1414 141)"/><ellipse cx="1662" cy="35" rx="10" ry="4" transform="rotate(-34 1662 35)"/><ellipse cx="1903" cy="142" rx="10" ry="4" transform="rotate(31 1903 142)"/></g></svg><article v-for="(item, index) in wedding.stories" :key="index" class="story-row"><div class="story-index"><span>{{ String(index + 1).padStart(2, '0') }}</span></div><div v-if="item.photo?.src" class="story-image photo-surface"><img :src="asset(item.photo.src)" :alt="item.photo.alt" loading="lazy"/></div><div class="story-text"><time>{{ item.date || '日期待填写' }}</time><h3>{{ item.title }}</h3><p v-if="item.text !== '这里留给你们真实的故事。'">{{ item.text }}</p></div></article></div></div><p class="timeline-hint">左右滑动，沿着时间继续阅读 <span aria-hidden="true">→</span></p>
    </section>

    <section class="counter reveal" aria-label="结婚纪念日"><div class="counter-inner"><span class="overline">THE DAYS WE SHARE</span><p>{{ count?.kind === 'before' ? '距离故事的新篇章还有' : '我们已经携手走过' }}</p><div class="counter-number">{{ count ? count.days : '—' }}<span>天</span></div><p class="counter-note" v-if="count?.kind === 'after'">距离下一个纪念日还有 {{ count.remaining }} 天 <span>·</span> {{ count.nextDate }}</p><p class="counter-note" v-else-if="count?.kind === 'before'">{{ count.nextDate }}，我们共同期待</p><p class="counter-note" v-else>填写婚礼日期后，故事会从这里开始计数</p></div></section>

    <section class="featured section-wrap reveal" aria-labelledby="featured-title"><div class="section-kicker">CHAPTER TWO <span>02 / 05</span></div><div class="section-heading"><p class="overline">THE EDIT</p><h2 id="featured-title">那些被珍藏的<i>瞬间。</i></h2><p>把最喜欢的片刻，留在这一页。</p></div><div class="featured-grid"><figure v-for="(photo, index) in wedding.featured" :key="index" :class="['feature-item', `feature-${index + 1}`]"><button type="button" class="photo-surface" :disabled="!photo.src" @click="openPreview(photo)" :aria-label="photo.src ? `查看${photo.alt}大图` : photo.alt"><img v-if="photo.src" :src="asset(photo.src)" :alt="photo.alt" loading="lazy"/><div v-else class="placeholder"><span>SELECTED MOMENT / {{ String(index + 1).padStart(2, '0') }}</span><strong>照片待加入</strong></div></button><figcaption><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ photo.caption }}</figcaption></figure></div></section>

    <section class="cinema reveal" aria-labelledby="cinema-title"><div class="cinema-heading"><span class="overline">A LITTLE FILM OF US</span><h2 id="cinema-title">让时光，<i>慢一些。</i></h2></div><div class="cinema-frame"><div v-for="(photo, index) in wedding.cinema" :key="index" class="cinema-slide" :class="{ active: index === cinemaIndex }" :aria-hidden="index !== cinemaIndex"><img v-if="photo.src" :src="asset(photo.src)" :alt="photo.alt" loading="lazy"/><div v-else class="placeholder"><span>FILM FRAME / {{ String(index + 1).padStart(2, '0') }}</span><strong>照片待加入</strong></div></div><div class="cinema-caption"><span>OUR MOMENTS IN MOTION</span><span>{{ String(cinemaIndex + 1).padStart(2, '0') }} / {{ String(wedding.cinema.length).padStart(2, '0') }}</span></div></div></section>

    <section class="albums section-wrap reveal" aria-labelledby="album-title"><div class="section-kicker">CHAPTER THREE <span>03 / 05</span></div><div class="section-heading"><p class="overline">THE ARCHIVE</p><h2 id="album-title">时光相册，<i>一直续写。</i></h2><p>从婚礼当天开始，往后的日子也会慢慢加入。</p></div><div v-for="(album, albumIndex) in wedding.albums" :key="albumIndex" class="album"><div class="album-heading"><div><span class="overline">ALBUM {{ String(albumIndex + 1).padStart(2, '0') }}</span><h3>{{ album.title }}</h3></div><span>{{ album.date }} · {{ album.photos.length }} 张</span></div><div class="album-strip"><figure v-for="(photo, index) in album.photos" :key="index"><button type="button" class="photo-surface" :disabled="!photo.src" @click="openPreview(photo)" :aria-label="photo.src ? `查看${photo.alt}大图` : photo.alt"><img v-if="photo.src" :src="asset(photo.src)" :alt="photo.alt" loading="lazy"/><div v-else class="placeholder"><span>PHOTO {{ String(index + 1).padStart(2, '0') }}</span><strong>照片待加入</strong></div></button><figcaption>{{ photo.caption }}</figcaption></figure></div><p class="swipe-hint">向左轻滑，继续翻阅 <span aria-hidden="true">→</span></p></div></section>

    <section class="blessing section-wrap reveal" aria-labelledby="blessing-title"><div class="section-kicker">CHAPTER FOUR <span>04 / 05</span></div><div class="letter reveal"><span class="letter-star">✳</span><p class="overline">A LETTER TO YOU BOTH</p><h2 id="blessing-title">愿爱，<i>岁岁常新。</i></h2><p class="blessing-text">{{ wedding.blessing }}</p><div class="signature">{{ wedding.blessingSignature }}<span>WITH LOVE, ALWAYS</span></div></div></section>

    <footer class="site-footer"><span>THE BEGINNING OF FOREVER</span><button v-if="wedding.showEasterEgg" type="button" class="seal" :aria-expanded="eggOpen" @click="eggOpen = !eggOpen">✳ <span>查看爱的版本记录</span></button><div v-if="eggOpen" class="egg"><p>LOVE, VERSION 1.0</p><ul><li><span>001</span> 初次相遇 · 故事开始</li><li><span>002</span> 彼此靠近 · 持续更新</li><li><span>003</span> 决定同行 · 双人协作</li><li><span>004</span> 未来的每一天 · 长期维护</li></ul><small>status: happily together · end date: never</small></div><p>Made with love, for the two of you.</p></footer>

    <div v-if="preview" class="lightbox" role="dialog" aria-modal="true" :aria-label="preview.alt" @click.self="closePreview"><button type="button" class="lightbox-close" @click="closePreview" aria-label="关闭照片预览">×</button><img :src="asset(preview.src || '')" :alt="preview.alt"/><p>{{ preview.caption }}</p></div>
  </main>
</template>

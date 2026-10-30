import coupleStage from '../figs/wedding-couple-stage.jpg'
import bouquetMoment from '../figs/wedding-bouquet-moment.jpg'
import familyCelebration from '../figs/wedding-family-celebration.jpg'
import bridePortrait from '../figs/bride-portrait-lantern.jpg'

export interface Photo { src?: string; alt: string; caption: string; shape?: 'portrait' | 'landscape' | 'square' }
export interface Story { date: string; title: string; text: string; photo?: Photo }

// 所有私人内容集中在这里。空日期和空图片会显示占位，不会编造真实经历。
export const wedding = {
  names: ['于文卿', '李健'],
  date: '2026-09-30', // YYYY-MM-DD；按上海日期计算
  location: '',
  origins: { partnerOne: '烟台', partnerTwo: '临汾', meeting: '北京' },
  hero: { src: coupleStage, alt: '于文卿与李健在婚礼舞台上合影', caption: '婚礼舞台 · 两个人的这一天', shape: 'landscape' } as Photo,
  opening: '从此，余生有你。',
  stories: [
    ['01', '初次相遇'], ['02', '渐渐熟悉'], ['03', '第一次共同出行'],
    ['04', '确认关系'], ['05', '一起面对重要时刻'], ['06', '关于未来的约定'],
    ['07', '特别的纪念日'], ['08', '领证'], ['09', '婚礼当天'],
  ].map(([number, title]) => ({ date: number === '09' ? '2026.9.30' : '', title, text: number === '09' ? '这一天，家人和朋友共同见证了你们的婚礼。' : '这里留给你们真实的故事。', photo: number === '09' ? { src: familyCelebration, alt: '于文卿与李健和亲友在婚礼当天合影', caption: '婚礼当天 · 与亲友同庆', shape: 'landscape' as const } : { src: '', alt: `${title}的照片`, caption: `故事 ${number}`, shape: (Number(number) % 2 ? 'portrait' : 'landscape') as Photo['shape'] } })) as Story[],
  featured: [
    { src: coupleStage, alt: '于文卿与李健在婚礼舞台上合影', caption: '婚礼舞台 · 两个人', shape: 'landscape' },
    { src: bridePortrait, alt: '新娘手提喜字灯笼的单人照', caption: '新娘肖像 · 喜上眉梢', shape: 'portrait' },
    { src: bouquetMoment, alt: '新郎向新娘献花，亲友在旁见证', caption: '献花时刻 · 心意抵达', shape: 'landscape' },
    { src: '', alt: '婚礼精选照片 4', caption: '约定', shape: 'portrait' },
    { src: '', alt: '婚礼精选照片 5', caption: '欢笑', shape: 'portrait' },
    { src: familyCelebration, alt: '于文卿与李健和亲友在婚礼当天合影', caption: '亲友同庆 · 此刻', shape: 'landscape' },
    { src: '', alt: '婚礼精选照片 7', caption: '此刻', shape: 'portrait' },
    { src: '', alt: '婚礼精选照片 8', caption: '余生', shape: 'portrait' },
  ] as Photo[],
  cinema: [
    { src: coupleStage, alt: '婚礼舞台上的于文卿与李健', caption: '婚礼舞台', shape: 'landscape' },
    { src: bouquetMoment, alt: '婚礼当天的献花瞬间', caption: '献花时刻', shape: 'landscape' },
    { src: familyCelebration, alt: '新人和亲友共同庆祝', caption: '亲友同庆', shape: 'landscape' },
  ] as Photo[],
  albums: [
    { title: '婚礼当天', date: '2026.9.30', photos: [
      { src: coupleStage, alt: '于文卿与李健在婚礼舞台上合影', caption: '婚礼舞台 · 新人合照', shape: 'landscape' },
      { src: bouquetMoment, alt: '新郎向新娘献花', caption: '婚礼当天 · 献花', shape: 'landscape' },
      { src: familyCelebration, alt: '新人和亲友共同庆祝', caption: '婚礼当天 · 亲友合影', shape: 'landscape' },
      { src: bridePortrait, alt: '新娘手提喜字灯笼的单人照', caption: '婚礼当天 · 新娘肖像', shape: 'portrait' },
      ...Array.from({ length: 8 }, (_, i) => ({ src: '', alt: `待加入的婚礼照片 ${i + 5}`, caption: `婚礼当天 · ${String(i + 5).padStart(2, '0')}`, shape: (i % 4 === 0 ? 'landscape' : 'portrait') as Photo['shape'] })),
    ] as Photo[] },
  ],
  blessing: '愿你们在未来的日子里，既是彼此的爱人，也是永远的同行者。愿生活中的每一次探索，都能因为彼此的陪伴而更加精彩。新婚快乐，愿幸福常伴。',
  blessingSignature: '来自家人的祝福',
  showEasterEgg: true,
}

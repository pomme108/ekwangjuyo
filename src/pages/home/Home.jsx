import { MainHero } from './MainHero'
import { BrandStory } from './BrandStory'
import { BrandTimeline } from './BrandTimeline'
import { DesignStory } from './DesignStory'
import { Best } from './Best'
import { Gift } from './Gift'
import PromotionBanner from './PromotionBanner';
import MyTable from './MyTable';
import Review from './Review'
import SNS from './SNS'


export const Home = () => {
  return (
    <>
      <MainHero />
      <BrandStory />
      <BrandTimeline />
      <DesignStory />
      <Best />
      <Gift />
      <PromotionBanner />
      <MyTable/>
      <Review/>
      <SNS/>
    </>
  )
}
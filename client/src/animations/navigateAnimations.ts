import { AnimationBuilder, createAnimation } from '@ionic/vue';

export const forwardAnimation: AnimationBuilder = (baseEl: any, opts?: any) => {
  const forwardAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .duration(250)
    .fromTo('transform', 'translateX(100%)', 'translateX(0%)')
    .fromTo('opacity', 0, 1);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .duration(250)
    .fromTo('opacity', 1, 0);

  return createAnimation()
    .addAnimation(forwardAnimation)
    .addAnimation(leavingAnimation);
};

export const backAnimation: AnimationBuilder = (baseEl: any, opts?: any) => {
  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .duration(200)
    .fromTo('transform', 'translateX(0)', 'translateX(100%)')
    .fromTo('opacity', 1, 0.7);

  const forwardAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .duration(200)
    .fromTo('opacity', 0.6, 1);

  return createAnimation()
    .addAnimation(forwardAnimation)
    .addAnimation(leavingAnimation);
};

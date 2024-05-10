import { AnimationBuilder, createAnimation } from '@ionic/vue';

/** Forward animation function
 * @param {Node} baseEl Base html element
 * @param {any} opts Additionals options
 * @returns {AnimationBuilder} Animation Builder function
 */
export const forwardAnimation: AnimationBuilder = (
  baseEl: Node,
  opts?: any,
) => {
  const forwardAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .duration(150)
    .fromTo('transform', 'translateX(100%)', 'translateX(0%)')
    .fromTo('opacity', 1, 1);

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .duration(150)
    .fromTo('opacity', 1, 0);

  return createAnimation()
    .addAnimation(forwardAnimation)
    .addAnimation(leavingAnimation);
};

/** Back animation function
 * @param {Node} baseEl Base html element
 * @param {any} opts Additionals options
 * @returns {AnimationBuilder} Animation Builder function
 */
export const backAnimation: AnimationBuilder = (baseEl: Node, opts?: any) => {
  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .duration(150)
    .fromTo('transform', 'translateX(0)', 'translateX(100%)')
    .fromTo('opacity', 0.5, 0.5);

  const forwardAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .duration(150)
    .fromTo('opacity', 0, 1);

  return createAnimation()
    .addAnimation(forwardAnimation)
    .addAnimation(leavingAnimation);
};

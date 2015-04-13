
/* TODO: add inset test once blend() works for it */

assertInterpolation({
  property: 'shape-outside',
  from: 'circle(100% at 0% 0%)',
  to: 'circle(50% at 25% 25%)',
}, [
  {at: -0.3, is: 'circle(115% at -7.5% -7.5%)'},
  {at: 0, is: 'circle(100% at 0% 0%)'},
  {at: 0.3, is: 'circle(85% at 7.5% 7.5%)'},
  {at: 0.6, is: 'circle(70% at 15% 15%)'},
  {at: 1, is: 'circle(50% at 25% 25%)'},
  {at: 1.5, is: 'circle(25% at 37.5% 37.5%)'}
]);

assertInterpolation({
  property: 'shape-outside',
  from: 'ellipse(100% 100% at 0% 0%)',
  to: 'ellipse(50% 50% at 25% 25%)',
}, [
  {at: -0.3, is: 'ellipse(115% 115% at -7.5% -7.5%)'},
  {at: 0, is: 'ellipse(100% 100% at 0% 0%)'},
  {at: 0.3, is: 'ellipse(85% 85% at 7.5% 7.5%)'},
  {at: 0.6, is: 'ellipse(70% 70% at 15% 15%)'},
  {at: 1, is: 'ellipse(50% 50% at 25% 25%)'},
  {at: 1.5, is: 'ellipse(25% 25% at 37.5% 37.5%)'}
]);

assertInterpolation({
  property: 'shape-outside',
  from: 'polygon(nonzero, 0px 0px, 25px 25px, 50px 50px)',
  to: 'polygon(nonzero, 25px 25px, 50px 50px, 75px 75px)',
}, [
  {at: -0.3, is: 'polygon(nonzero, -7.5px -7.5px, 17.5px 17.5px, 42.5px 42.5px)'},
  {at: 0, is: 'polygon(nonzero, 0px 0px, 25px 25px, 50px 50px)'},
  {at: 0.3, is: 'polygon(nonzero, 7.5px 7.5px, 32.5px 32.5px, 57.5px 57.5px)'},
  {at: 0.6, is: 'polygon(nonzero, 15px 15px, 40px 40px, 65px 65px)'},
  {at: 1, is: 'polygon(nonzero, 25px 25px, 50px 50px, 75px 75px)'},
  {at: 1.5, is: 'polygon(nonzero, 37.5px 37.5px, 62.5px 62.5px, 87.5px 87.5px)'}
]);

assertInterpolation({
  property: 'shape-outside',
  from: 'polygon(evenodd, 0px 0px, 25px 25px, 50px 50px)',
  to: 'polygon(nonzero, 25px 25px, 50px 50px, 75px 75px)',
}, [
  {at: -0.3, is: 'polygon(evenodd, 0px 0px, 25px 25px, 50px 50px)'},
  {at: 0, is: 'polygon(evenodd, 0px 0px, 25px 25px, 50px 50px)'},
  {at: 0.3, is: 'polygon(evenodd, 0px 0px, 25px 25px, 50px 50px)'},
  {at: 0.6, is: 'polygon(nonzero, 25px 25px, 50px 50px, 75px 75px)'},
  {at: 1, is: 'polygon(nonzero, 25px 25px, 50px 50px, 75px 75px)'},
  {at: 1.5, is: 'polygon(nonzero, 25px 25px, 50px 50px, 75px 75px)'},
]);

assertInterpolation({
  property: 'shape-outside',
  from: 'none',
  to: 'ellipse(100% 100% at 0% 0%)',
}, [
  {at: -0.3, is: 'none'},
  {at: 0, is: 'none'},
  {at: 0.3, is: 'none'},
  {at: 0.6, is: 'ellipse(100% 100% at 0% 0%)'},
  {at: 1, is: 'ellipse(100% 100% at 0% 0%)'},
  {at: 1.5, is: 'ellipse(100% 100% at 0% 0%)'}
]);

// TODO: add intermediate keyframe tests when CSS shapes position computed values are cleaned up
assertInterpolation({
  property: 'shape-outside',
  from: 'circle(20% at right 10% bottom 20px)',
  to: 'circle(30% at right 20% bottom 30px)',
}, [
  {at: 0, is: 'circle(20% at right 10% bottom 20px)'},
  {at: 0.5, is: 'circle(25% at 85% calc(-25px + 100%))'},
  {at: 1, is: 'circle(30% at right 20% bottom 30px)'},
]);

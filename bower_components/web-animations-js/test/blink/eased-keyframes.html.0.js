
test(function() {
  assertAnimationStyles([
    {opacity: '0', left: '0px', easing: 'steps(2, start)'},
    {opacity: '0.25', left: '25px'},
    {opacity: '0.75', left: '75px'},
  ], {
    0: {opacity: '0.125', left: '12.5px'},
    0.125: {opacity: '0.125', left: '12.5px'},
    0.25: {opacity: '0.25', left: '25px'},
    0.375: {opacity: '0.25', left: '25px'},
    0.5: {opacity: '0.25', left: '25px'},
    0.625: {opacity: '0.375', left: '37.5px'},
    0.75: {opacity: '0.5', left: '50px'},
    0.875: {opacity: '0.625', left: '62.5px'},
    1: {opacity: '0.75', left: '75px'},
  }, 'with easing on first keyframe');

  assertAnimationStyles([
    {opacity: '0', left: '0px'},
    {opacity: '0.5', left: '50px', easing: 'steps(2, start)'},
    {opacity: '0.75', left: '75px'},
  ], {
    0: {opacity: '0', left: '0px'},
    0.125: {opacity: '0.125', left: '12.5px'},
    0.25: {opacity: '0.25', left: '25px'},
    0.375: {opacity: '0.375', left: '37.5px'},
    0.5: {opacity: '0.625', left: '62.5px'},
    0.625: {opacity: '0.625', left: '62.5px'},
    0.75: {opacity: '0.75', left: '75px'},
    0.875: {opacity: '0.75', left: '75px'},
    1: {opacity: '0.75', left: '75px'},
  }, 'with easing on second keyframe');
},
'element.animate() with eased keyframe',
{
  help: 'http://dev.w3.org/fxtf/web-animations/#the-keyframe-dictionary',
  assert: [
    'element.animate() should start an animation when keyframes are specified with timing functions',
    'for their easing property. The animation should use the given timing function between consecutive',
    'keyframe offsets.',
  ],
  author: 'Alan Cutter',
});

test(function() {
  assertAnimationStyles([
    {opacity: '0', offset: 0, easing: 'steps(2, start)'},
    {left: '0px', offset: 0},
    {opacity: '0.5', left: '50px'},
  ], {
    0: {opacity: '0.25', left: '0px'},
    0.25: {opacity: '0.25', left: '12.5px'},
    0.5: {opacity: '0.5', left: '25px'},
    0.75: {opacity: '0.5', left: '37.5px'},
    1: {opacity: '0.5', left: '50px'},
  });
},
'element.animate() with eased keyframe on single property',
{
  help: 'http://dev.w3.org/fxtf/web-animations/#the-keyframe-dictionary',
  assert: [
    'element.animate() should start an animation when keyframes are specified with timing functions',
    'for their easing property. The animation should use the given timing function only on the properties',
    'specified in the same keyframe.',
  ],
  author: 'Alan Cutter',
});

test(function() {
  assertAnimationStyles([
    {opacity: '0', left: '0px'},
    {opacity: '0.5', left: '50px', easing: 'steps(2, start)'},
  ], {
    0: {opacity: '0', left: '0px'},
    0.25: {opacity: '0.125', left: '12.5px'},
    0.5: {opacity: '0.25', left: '25px'},
    0.75: {opacity: '0.375', left: '37.5px'},
    1: {opacity: '0.5', left: '50px'},
  });
},
'element.animate() with easing on last keyframe',
{
  help: 'http://dev.w3.org/fxtf/web-animations/#the-keyframe-dictionary',
  assert: [
    'element.animate() should start an animation when keyframes are specified with timing functions',
    'for their easing property. Easing on the last keyframes should have no effect on the animation.',
  ],
  author: 'Alan Cutter',
});

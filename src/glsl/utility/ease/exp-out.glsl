/*
【指数関数的に減少させるイージング】
・tickの増加に伴って 0 に近づく
・powerを上げればより速く 0 に近づく
*/
float expOut (
  float tick,
  float power
) {
  float result = exp(-tick * power);
  if (result < .01) {
    return 0.;
  } else {
   return result;
  }
}

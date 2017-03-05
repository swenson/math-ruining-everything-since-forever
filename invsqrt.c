#include <stdio.h>

float Q_rsqrt(float number) {
  float x2 = number * 0.5F;
  float y  = number;
  long i  = * ( long * ) &y; // evil floating point bit level hacking
  i  = 0x5f3759df - ( i >> 1 ); // wtf?
  y  = * ( float * ) &i;
  y  = y * ( 1.5F - ( x2 * y * y ) ); // 1st iteration
  return y;
}

int main(void) {
  int x = 0x5f3759df;
  printf("%f\n", *(float *) &x);
}

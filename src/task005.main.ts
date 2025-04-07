//*******************************************
//***** DO NOT CHANGE CODE IN THIS FILE *****
//*******************************************
import { spiral } from './task005'

const N = Number.parseInt(process.env.N ?? '-1')

if (0 <= N && N <= 50_000) {
  spiral(N)
} else {
  throw new Error('Environment variable N must be an non-negative integer not greater than 50000')
}

export const BoxKeySubscriptionsDescription = 'd'

// max chunk size for loadDescription(wallet, offset, data)
// setServiceDescription(wallet, rekeyBack, id, offset, data) has the largest
// ABI overhead in this plugin's description flow:
// [selector:4][wallet:8][rekeyBack:1][id:8][offset:8][data_length:2][data:N] = 2048
// overhead = 31 bytes, max data = 2017 bytes
export const MAX_LOAD_DESCRIPTION_CHUNK_SIZE = 2017

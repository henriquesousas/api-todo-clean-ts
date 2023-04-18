export interface Mapper<I,O> {
  toObject(data:I) : O
}
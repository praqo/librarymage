export default function Pagination({ data }) {
  return <h5>Pages {data.totalCount / 100}</h5>;
}

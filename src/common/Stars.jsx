import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Stars({ valor, max = 5 }) {
  const estrellas = [];

  for (let i = 1; i <= max; i++) {
    if (valor >= i) {
      estrellas.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (valor >= i - 0.5) {
      estrellas.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      estrellas.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }

  return <div className="flex gap-1">{estrellas}</div>;
}

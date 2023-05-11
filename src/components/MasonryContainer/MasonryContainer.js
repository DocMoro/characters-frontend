import './MasonryContainer.scss'

import { useRef } from "react";
import { useGetCardWidth } from "./hooks/useGetCardWidth";
import MasonryCard from "./MasonryCard/MasonryCard";

export default function MasonryContainer({cbForm, cbDell, cbClose, cbPlus, spells, charList, isCreator }) {
  const ref = useRef(null);
  const cardWidth = useGetCardWidth(ref);

  return (
    <section className="masonry__container" ref={ref}>
      {spells.map((spell) =>
      <MasonryCard key={spell._id} cbForm={cbForm} cbDell={cbDell} spell={spell} charList={charList} cardWidth={cardWidth} cbClose={cbClose} cbPlus={cbPlus} isCreator={isCreator} />
      )}
    </section>
  );
}
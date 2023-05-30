import "./SpellsCard.scss";

import { useContext, useState } from "react";
import { CloseButton } from "react-bootstrap";

import { Plus } from "react-bootstrap-icons";
import CardMenu from "../CardMenu/CardMenu";

import { CurrentUserContext } from "../../contexts/currentUserContext";
import IconButton from "../IconButton/IconButton";

export default function SpellCard({
  cbForm,
  cbDell,
  cbClose,
  cbPlus,
  spell,
  charList,
  isCreator,
}) {
  const { role } = useContext(CurrentUserContext);
  const {
    inList,
    name,
    school,
    level,
    casting_time,
    range,
    components,
    material,
    concentration,
    duration,
    classes,
    desc,
    higher_level,
  } = spell;
  const [isСlosure, setIsСlosure] = useState(inList);

  const handlePlusButton = () => {
    cbPlus(spell);
    setIsСlosure(true);
  };

  const handleCloseButton = () => {
    cbClose(spell);
    setIsСlosure(false);
  };

  const handleUpdate = () => {
    cbForm({
      isShow: true,
      data: spell,
      update: true,
    });
  };

  const handleDelete = () => {
    cbDell(spell);
  };

  return (
    <li className="spell">
      <div className="spell__container">
        <h3 className="spell__title">{name}</h3>
        {charList ? (
          isCreator && isСlosure ? (
            <CloseButton onClick={handleCloseButton} />
          ) : (
            <IconButton icon={<Plus size={24} />} onClick={handlePlusButton} />
          )
        ) : (
          role === "Admin" && (
            <CardMenu cbForm={handleUpdate} cbDell={handleDelete} isSpell />
          )
        )}
      </div>
      <div className="spell__container">
        <p className="spell__text">{school}</p>
        <p className="spell__text">{`${level} уровень`}</p>
      </div>
      <p className="spell__text">{`Время накладывания: ${casting_time}`}</p>
      <p className="spell__text">{`Дистанция: ${range}`}</p>
      <p className="spell__text">{`Компоненты: ${components.join(", ")}${
        material ? `(${material})` : ""
      }`}</p>
      <p className="spell__text">{`Длительность: ${
        concentration ? "Концентрация, вплоть до " : ""
      }${duration}`}</p>
      <p className="spell__text">{`Классы: ${classes.join(", ")}`}</p>
      <p className="spell__text">{desc}</p>
      <p className="spell__text">{`На больших уровнях: ${higher_level}`}</p>
    </li>
  );
}

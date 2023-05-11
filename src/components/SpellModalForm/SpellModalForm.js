import {Button, Modal} from "react-bootstrap";

import SpellForm from "../SpellForm/SpellForm";
import CharForm from "../CharForm/CharForm";

export default function SpellModalForm({isForm, cbForm, cbSubmit}) {
  const { isShow, data, update } = isForm;

  const handleCloseForm = () => {
    cbForm({
      ...isForm,
      isShow: false
    })
  }

  return (
    <Modal show={isShow} onHide={handleCloseForm}>
      <Modal.Header closeButton>
        <Modal.Title>{update ? "Изменить " : "Добавить "}{data.spells ? "название" : "заклинание"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data.spells
          ? <CharForm char={data} cbSubmit={cbSubmit} update={update} />
          : <SpellForm spell={data} cbSubmit={cbSubmit} update={update} />}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseForm}>
          Отменить
        </Button>
        <Button variant="primary" type="submit" form={`spell-${data ? data._id : "add"}-form`}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
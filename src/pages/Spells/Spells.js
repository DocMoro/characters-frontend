import { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { CloseButton, Button } from 'react-bootstrap';

import ResourcesService from "../../service/ResoursesService/ResourcesService";
import MasonryContainer from "../../components/MasonryContainer/MasonryContainer";
import SpellModalForm from '../../components/SpellModalForm/SpellModalForm';
import PlusButton from '../../components/PlusButton/PlusButton';

import { CurrentUserContext } from '../../contexts/currentUserContext';

let charSpells = [];

export default function Spells({charList}) {
  const { role } = useContext(CurrentUserContext);

  const { charID } = useParams();

  const [isForm, setIsForm] = useState({
    isShow: false,
    data: {},
    update: false
  });
  const [spells, setSpells] = useState([]);
  const [isAddLiseElements, setIsAddLiseElements] = useState(false); // переключатель добавления карточек в чарлист

  const handleAddInAllSpells = () => {
    setIsForm({
      isShow: true,
      data: {},
      update: false
    })
  };

  const cbSubmit = async (data, update) => {
    try {
      const spell = update
        ? await ResourcesService.updateSpell(data._id, data)
        : await ResourcesService.createSpell(data);

      let spellsData = JSON.parse(sessionStorage.getItem('spellsData'));
      spellsData = update
        ? spellsData.map(s => {
            if(spell._id === s._id) {
              return spell
            }
            return s
          })
        : [...spells, spell];
      sessionStorage.setItem('spellsData', JSON.stringify(spellsData));
      
      setSpells(spellsData);
      setIsForm({
        ...isForm,
        isShow: false
      });
    } catch(err) {
      console.log(err);
    }
  };

  const getAllSpells = async () => {
    try {
      let spells = JSON.parse(sessionStorage.getItem('spellsData'));

      if(!spells) {
        spells = await ResourcesService.getSpells();
        sessionStorage.setItem('spellsData', JSON.stringify(spells));
      }
      return spells
    } catch(err) {
      console.log(err);
      return []
    }
  };

  const getCharSpells = useCallback( async () => {
    try {    
      charSpells = await ResourcesService.getCharacter(charID).spells;
    } catch(err) {
      console.log(err);
    }
  }, [charID]);

  const renderAllSpells = useCallback( () => {
    let spells = getAllSpells();

    spells = spells.map(spell => {
      spell.inList = charSpells.some(s => s._id === spell._id);
      return spell;
    });
    setSpells(spells);
  }, []);

  const renderCharSpells = () => {
    const spells = charSpells.map(spell => {
      spell.inList = true;
      return spell
    });
    setSpells(spells);
  };

  const handleCloseButton = () => {
    renderCharSpells();
    setIsAddLiseElements(false);
  };

  const handlePlusButton = () => {
    renderAllSpells();
    setIsAddLiseElements(true);
  }

  const cbClose = async (data) => {
    try {
      const { _id: spellID } = data;
      const spellsData = charSpells.filter(s => s._id !== spellID);
      charSpells = await ResourcesService.updateCharacter(charID, spellsData).spells;

      if(!isAddLiseElements) {
        setSpells(charSpells);
      }
    } catch(err) {
      console.log(err);
    }
  };

  const cbPlus = async (data) => {
    try {
      const spellsData = charSpells.push(data);
      charSpells = await ResourcesService.updateCharacter(charID, spellsData).spells;
    } catch(err) {
      console.log(err);
    }
  };

  const cbDell = async (data) => {
    try {
      const { _id: spellID } = data;
      await ResourcesService.deleteSpell(spellID);
  
      let spellsData = JSON.parse(sessionStorage.getItem('spellsData'));
      spellsData = spellsData.filter(s => s._id !== spellID);
      sessionStorage.setItem('spellsData', JSON.stringify(spellsData));
  
      setSpells(spellsData);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(!charList) {
      const spells = getAllSpells();
      
      setSpells(spells);
    } else {
      getCharSpells();

      if(!charSpells.length) {
        setIsAddLiseElements(true);
        renderAllSpells();
      } else {
        renderCharSpells();
      }
    }
  }, [charList, getCharSpells, renderAllSpells]);

  return (
    <main className="w-100 flex-grow-1">
      {charList 
        ? isAddLiseElements 
          ? <CloseButton onClick={handleCloseButton} />
          : <Button onClick={handlePlusButton} />
        : role === 'Admin' && <Button onClick={handleAddInAllSpells} />
      }
      <MasonryContainer cbForm={setIsForm} cbDell={cbDell} spells={spells} charList={charList} cbClose={cbClose} cbPlus={cbPlus} />
      <SpellModalForm isForm={isForm} cbForm={setIsForm} cbSubmit={cbSubmit} />
    </main>
  );
}
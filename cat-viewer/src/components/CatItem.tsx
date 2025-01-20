import React, { useState } from 'react';

// Пути к файлам изображений сердец
const IMG_HEART_FILLED = "/frontend-challenge/images/heart-filled.png";
const IMG_HEART_EMPTY = "/frontend-challenge/images/heart-empty.png";

/**
 * Тип для пропсов CatItem
 * @param cat - Объект кота, который отображается в карточке
 * @param onAddToFavorites - Функция для добавления кота в "любимые"
 * @param onRemoveFromFavorites - Функция для удаления кота из "любимых"
 * @param isFavorite - Флаг, указывающий, является ли кот в списке "любимых"
 */
type CatItemProps = {
  cat: any;
  onAddToFavorites: (cat: any) => void;
  onRemoveFromFavorites: (catId: string) => void;
  isFavorite: boolean;
};

/**
 * Компонент для отображения карточки кота.
 * Отображает карточку кота с возможностью добавления/удаления из "любимых"
 * @param cat - Данные кота
 * @param onAddToFavorites - Функция для добавления кота в "любимые"
 * @param onRemoveFromFavorites - Функция для удаления кота из "любимых"
 * @param isFavorite - Флаг, который определяет, находится ли кот в "любимых"
 */
const CatItem: React.FC<CatItemProps> = ({
  cat,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="cat-item">
      <img src={cat.url} alt="cat" />
      <div
        className="favorite-icon"
        onClick={() =>
          isFavorite ? onRemoveFromFavorites(cat.id) : onAddToFavorites(cat)
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={hovered || isFavorite ? IMG_HEART_FILLED : IMG_HEART_EMPTY}
          alt="heart"
        />
      </div>
    </div>
  );
};

export default CatItem;

import React from 'react';

// Текст для вкладок
const ALL_CATS = "Все котики";
const FAVORITES_CATS = "Любимые котики";


/**
 * Тип для пропсов Tabs
 * @param activeTab - Текущая активная вкладка
 * @param setActiveTab - Функция для изменения активной вкладки
 */
type TabsProps = {
    activeTab: 'all' | 'favorites';
    setActiveTab: (tab: 'all' | 'favorites') => void;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="tabs">
            <div className="tabs-container">
                <div
                    className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    {ALL_CATS}
                </div>
                <div
                    className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
                    onClick={() => setActiveTab('favorites')}
                >
                    {FAVORITES_CATS}
                </div>
            </div>
        </div>
    );
};

export default Tabs;

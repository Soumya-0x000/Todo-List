import { motion } from "framer-motion";
import { useState } from "react";

const ToggleBtn = ({ handleTodoClick, handleCompletedClick, todoLength, completedLength }) => {
    const tabs = [
        { name: "Todo", click: handleTodoClick, length: todoLength },
        { name: "Completed", click: handleCompletedClick, length: completedLength }
    ];

    const [selected, setSelected] = useState(tabs[0].name);

    const handleClick = (tab) => {
        setSelected(tab.name);
        tab.click();
    };

    return (
        <div className=" px-2 py-2 sm:h-[51px] rounded-lg bg-slate-900 flex items-center flex-wrap gap-2">
            {tabs.map((tab, index) => (
                <Chip
                    text={tab.name}
                    selected={selected === tab.name}
                    setSelected={() => handleClick(tab)}
                    key={index}
                    length={tab.length}
                />
            ))}
        </div>
    );
};

const Chip = ({ text, selected, setSelected, length }) => {
    return (
        <button
        onClick={setSelected}
        className={`${
            selected
            ? "text-white"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } text-[13px] sm:text-lg transition-colors px-2 sm:px-2.5 py-0.5 rounded-md relative`}>
            <span className="relative z-10 font-robotoMono">{text} {length}</span>
            {selected && (
                <motion.span
                layoutId="pill-tab"
                transition={{ type: "spring", duration: 0.5 }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md"
                ></motion.span>
            )}
        </button>
    );
};

export default ToggleBtn;

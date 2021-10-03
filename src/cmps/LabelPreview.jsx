import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { motion } from "framer-motion"

export function LabelPreview({ label, toggleLabel, isSelected, toggleEditLabel}) {

    return <li className="label-mod">
        <div className="label-mod-wrapper">
            <motion.div className="label-mod-selectable"
                style={{ backgroundColor: label.color }} name="label"
                whileHover={{ boxShadow: `-8px 0 ${label.hoverColor}` }}
                onClick={() => toggleLabel(label, 'labels')}>
                <span>{label.title}</span>
                {isSelected && <span className="icon-check" >
                    <CheckIcon style={{ width: '16px', height: '16px', color: 'white' }} />
                </span>}
            </motion.div>
            <div className="label-edit-btn">
                <EditIcon  style={{ width: '16px', height: '16px', color: '#42526e',cursor: 'pointer'}}
                    onClick={() => toggleEditLabel(label)} />
            </div>
        </div>
    </li>
}

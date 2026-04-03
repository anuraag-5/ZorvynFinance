import * as motion from "motion/react-client";
import RadialChart from "./RadialChart";

const SummaryCard = ({ classname, totalValue, currentValue, color, iconSrc, screenWidth }: { classname: string, totalValue: number, currentValue: number, color?: string, iconSrc: string, screenWidth: number }) => {

    return (
        <motion.div className={classname + " relative flex items-center justify-end overflow-hidden"}
            layout
            transition={{ duration: 0.4 }}
        >
            <RadialChart
                totalValue={totalValue}
                currentValue={currentValue}
                color={color}
                iconSrc={iconSrc}
                screenWidth={screenWidth}
            />
        </motion.div>
    )
}

export default SummaryCard;
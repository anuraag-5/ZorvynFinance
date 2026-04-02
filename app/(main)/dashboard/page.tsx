import * as motion from "motion/react-client";

const Dashboard = () => {
    return (
        <motion.div
            layout
            className="flex-1"
            transition={{ duration: 0.4 }}
        >
            Dashboard
        </motion.div>
    );
};

export default Dashboard
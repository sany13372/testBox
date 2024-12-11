import { FC, useEffect, useMemo, useState } from "react";
import { Box, Button, Card, Tab, Tabs, Typography } from "@mui/material";
import { useTodos } from "../../TodosProvider";

const tabs = ["All", "Active", "Completed"] as const;
type TabType = typeof tabs[number];

const FilterTodo: FC = () => {
    const [selectedTab, setSelectedTab] = useState<TabType>("All");
    const { initialTodoList, filterTodos, updateAllTodos } = useTodos();

    const activeItemsCount = useMemo(
        () => initialTodoList.filter((item) => !item.completed).length,
        [initialTodoList]
    );

    useEffect(() => {
        const filter = () => {
            if (selectedTab === 'All') return initialTodoList;
            if (selectedTab === 'Active') return initialTodoList.filter((item) => !item.completed);
            if (selectedTab === 'Completed') return initialTodoList.filter((item) => item.completed);
        };

        filterTodos(filter() || []);
    }, [selectedTab, initialTodoList]);

    const clearCompletedTodos = () => {
        updateAllTodos(initialTodoList.filter((item) => !item.completed));
    };

    return (
        <Card variant="outlined" sx={{ minWidth: 540, padding: 2, maxWidth:580 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="subtitle1" color="textSecondary">
                    Items left: {activeItemsCount}
                </Typography>
                <Tabs value={selectedTab} onChange={(_, tab) => setSelectedTab(tab)}>
                    {tabs.map((tab) => (
                        <Tab label={tab} key={tab} value={tab} />
                    ))}
                </Tabs>
                <Button variant="text" onClick={clearCompletedTodos}>
                    Clear completed
                </Button>
            </Box>
        </Card>
    );
};

export default FilterTodo;
import React from 'react';

type ListProps<T> = {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor: (item: T) => string;
};

export const List = <T,>({ items, renderItem, keyExtractor }: ListProps<T>) => {
    return items.map((item, index) => (
        <React.Fragment key={keyExtractor(item)}>
            {renderItem(item, index)}
        </React.Fragment>
    ));
};

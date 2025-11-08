import React, { useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface Item {
  id: string;
  position: number;
}

export interface FoodItem extends Item {
  category: string;
  name: string;
  description?: string | null;
  price: number;
  likes?: number | null;
  tag?: string | null;
  imgUrl?: string | null;
  available?: boolean | null;
  availableFrom?: string;
  availableTo?: string;
}

interface SortableContainerProps<T extends Item> {
  item: T;
  Comp: React.ComponentType<{ item: T }>;
}

function SortableContainer<T extends Item>({ item, Comp }: SortableContainerProps<T>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    border: isDragging ? '3px solid #6366f1' : 'none',
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 'auto', 
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="list-none mb-4 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <Comp item={item} />
    </li>
  );
}

// Memoize the generic component
const MemoizedSortableContainer = React.memo(SortableContainer) as typeof SortableContainer;


// --- Generic Sortable List Component ---

interface GenericSortableListProps<T extends Item> {
  items: T[];
  setItems:(val:T[])=>void;
  Comp: React.ComponentType<{ item: T }>;
  listTitle?: string;
}

export function GenericSortableList<T extends Item>({
  items,
  setItems,
  Comp
}: GenericSortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);

      const reorderedItems = arrayMove(items, oldIndex, newIndex);

      const updatedItems = reorderedItems.map((item, index) => ({
        ...item,
        position: index + 1,
      }));
      
      setItems(updatedItems); 
    }
  };

  const itemIds = useMemo(() => items.map(item => item.id), [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >   
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
        >
            {items.map((item) => (
              <MemoizedSortableContainer 
                key={item.id} 
                item={item} 
                Comp={Comp}
              />
            ))}
        </SortableContext>
    </DndContext>
  );
}

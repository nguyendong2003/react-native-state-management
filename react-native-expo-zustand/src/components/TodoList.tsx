import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTodoStore } from '../store/useTodoStore';
import { useShallow } from 'zustand/react/shallow';
import TodoItem from './TodoItem';

const priorityOptions: ('High' | 'Medium' | 'Low')[] = ['High', 'Medium', 'Low'];

const priorityStyles = {
  High: {
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.12)',
    activeBg: '#ef4444',
  },
  Medium: {
    color: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.12)',
    activeBg: '#3b82f6',
  },
  Low: {
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.12)',
    activeBg: '#64748b',
  },
};

export default function TodoList() {
  const addTodo = useTodoStore((state) => state.addTodo);

  const todoList = useTodoStore(
    useShallow((state) => {
      const { todos, filters } = state;
      const { search, status, priorities } = filters;
      const searchLower = search.toLowerCase();

      return todos.filter((todo) => {
        const nameMatches = todo.name.toLowerCase().includes(searchLower);

        if (status === 'All') {
          return priorities.length
            ? nameMatches && priorities.includes(todo.priority)
            : nameMatches;
        }

        const statusMatches = status === 'Completed' ? todo.completed : !todo.completed;
        const priorityMatches = priorities.length ? priorities.includes(todo.priority) : true;

        return nameMatches && statusMatches && priorityMatches;
      });
    })
  );

  const [todoName, setTodoName] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  const handleAdd = () => {
    if (!todoName.trim()) return;

    addTodo({
      id: Date.now().toString(),
      name: todoName.trim(),
      priority,
      completed: false,
    });

    setTodoName('');
    setPriority('Medium');
  };

  return (
    <View style={styles.container}>
      {/* FlatList of filtered todos */}
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            id={item.id}
            name={item.name}
            completed={item.completed}
            priority={item.priority}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found matching filters.</Text>
          </View>
        }
      />

      {/* Input Group to Add Todo */}
      <View style={styles.inputCard}>
        <TextInput
          style={styles.textInput}
          placeholder="What needs to be done?"
          placeholderTextColor="rgba(255, 255, 255, 0.3)"
          value={todoName}
          onChangeText={setTodoName}
        />

        <View style={styles.optionsRow}>
          <View style={styles.prioritySelector}>
            {priorityOptions.map((opt) => {
              const isSelected = priority === opt;
              const stylesObj = priorityStyles[opt];
              return (
                <Pressable
                  key={opt}
                  onPress={() => setPriority(opt)}
                  style={[
                    styles.priorityBtn,
                    {
                      backgroundColor: isSelected ? stylesObj.activeBg : stylesObj.bg,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityBtnText,
                      { color: isSelected ? '#ffffff' : stylesObj.color },
                    ]}
                  >
                    {opt}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={handleAdd}
            disabled={!todoName.trim()}
            style={({ pressed }) => [
              styles.addButton,
              !todoName.trim() && styles.addButtonDisabled,
              pressed && styles.addButtonPressed,
            ]}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
  inputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    marginTop: 10,
    gap: 12,
  },
  textInput: {
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 15,
  },
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  prioritySelector: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 4,
  },
  priorityBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  priorityBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonPressed: {
    opacity: 0.8,
  },
  addButtonText: {
    color: '#070A13',
    fontSize: 14,
    fontWeight: '700',
  },
});

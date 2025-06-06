import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '@src/components/Header';
import SearchContainer from '@src/components/SearchContainer';
import ListContainer from '@src/components/ListContainer';
import UpsertModal from '@src/components/UpsertModal';
import DeleteModal from '@src/components/DeleteModal';
import { EventItem } from '@src/types/event';
import { themes } from '@src/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@event_list';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: themes.dark.normalBg,
  },
  list: {
    flex: 1,
  },
});

const Home: React.FC = () => {
  const [list, setList] = useState<EventItem[]>([]);
  const [search, setSearch] = useState('');
  const [upsertVisible, setUpsertVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 加载保存的数据
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setList(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('加载数据失败:', error);
      }
    };
    loadData();
  }, []);

  // 数据变化时保存
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (error) {
        console.error('保存数据失败:', error);
      }
    };
    saveData();
  }, [list]);

  const filteredList = useMemo(() => {
    return list.filter(item => item.event.includes(search));
  }, [list, search]);

  const handleAdd = () => {
    setEditingId(null);
    setUpsertVisible(true);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setUpsertVisible(true);
  };

  const handleUpsert = (event: string) => {
    setSearch('');
    if (editingId === null) {
      const newItem: EventItem = {
        id: Date.now(),
        event,
        createdAt: new Date(),
        completed: false,
      };
      setList([newItem, ...list]);
    } else {
      setList(list.map(item => item.id === editingId ? { ...item, event } : item));
    }
    setUpsertVisible(false);
  };

  const handleToggle = (id: number) => {
    setList(list.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setDeleteVisible(true);
  };

  const confirmDelete = () => {
    if (deletingId !== null) {
      setList(list.filter(item => item.id !== deletingId));
    }
    setDeleteVisible(false);
  };

  const editingItem = editingId !== null ? list.find(item => item.id === editingId) : undefined;
  const deletingItem = deletingId !== null ? list.find(item => item.id === deletingId) : undefined;

  return (
    <View style={styles.container}>
      <Header />
      <SearchContainer search={search} setSearch={setSearch} onAdd={handleAdd} />
      <View style={styles.list}>
        <ListContainer
          list={filteredList}
          onEdit={handleEdit}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </View>
      <UpsertModal
        visible={upsertVisible}
        onClose={() => setUpsertVisible(false)}
        onConfirm={handleUpsert}
        defaultValue={editingItem?.event || ''}
        search={search}
      />
      <DeleteModal
        visible={deleteVisible}
        onClose={() => setDeleteVisible(false)}
        onConfirm={confirmDelete}
        eventName={deletingItem?.event || ''}
      />
    </View>
  );
};

export default Home;

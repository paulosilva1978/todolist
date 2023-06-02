import { styles } from './styles'
import React, { useState } from 'react'
import uuid from 'react-native-uuid'
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
} from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { CheckBox } from 'react-native-elements'
import ClipBoard from '../../assets/clipboard.svg'
import dayjs from 'dayjs'
import { LinearGradient } from 'expo-linear-gradient'

interface Tarefas {
  id: any
  content: string
  isDone: boolean
  createdAt: any
}

export function Form() {
  const [tarefas, setTarefas] = useState<Tarefas[]>([])
  const [novaTarefa, setNovaTarefa] = useState('')

  function handleAddNovaTarefa() {
    const schemaTarefa = {
      id: uuid.v4(), // gerar id para a tarefa tipo uuid
      content: novaTarefa,
      isDone: false,
      createdAt: new Date(),
    }

    if (tarefas.filter((item) => item.content === novaTarefa).length) {
      return Alert.alert(
        'Tarefa existe',
        'Já existe uma tarefa como esta cadastrada.',
      )
    }

    novaTarefa.length === 0
      ? Alert.alert('Tarefa vazia', 'O conteúdo da tareda está vazio.')
      : setTarefas([...tarefas, schemaTarefa])
    setNovaTarefa('')
  }

  function handleDelTarefa(taskId: string) {
    const novaTarefaMenosTarefaSelecionada = tarefas.filter(
      (item) => item.id !== taskId,
    )
    setTarefas(novaTarefaMenosTarefaSelecionada)
  }

  function marcarTarefaCompletada(taskId: string) {
    const atualizarTarefas = tarefas.map((task) => {
      if (task.id === taskId) {
        task.isDone = !task.isDone
      }
      return task
    })
    setTarefas(atualizarTarefas)
  }

  const tarefaCompleta = tarefas
    .filter((taskComp) => taskComp.isDone === true)
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
  const tarefaIncompleta = tarefas
    .filter((taskInc) => taskInc.isDone === false)
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
  const tarefaOrganizada = [...tarefaIncompleta, ...tarefaCompleta]

  const [estaSelecionado, setEstaSelecionado] = useState(false)

  return (
    <View style={styles.container}>
      {/* Formulário para adicionar tarefa */}
      <>
        <View style={styles.formulario}>
          <TextInput
            style={[
              styles.formTextInput,
              estaSelecionado && styles.estaSelecionado,
            ]}
            onFocus={() => {
              setEstaSelecionado(true)
            }}
            onBlur={() => {
              setEstaSelecionado(false)
            }}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor="#808080"
            onChangeText={setNovaTarefa}
            value={novaTarefa}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddNovaTarefa}>
            <Ionicons
              name={'md-add-circle-outline'}
              size={30}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contadorFrom}>
          <Text style={[styles.contador, { color: '#4EA8DE' }]}>Criadas</Text>
          <Text style={styles.contadorTexto}>{tarefas.length}</Text>
          <Text style={[styles.contador, { color: '#8284FA' }]}>
            Concluídas
          </Text>
          <Text style={styles.contadorTexto}>
            {tarefaCompleta.length === 0
              ? 0
              : `${tarefaCompleta.length} / ${tarefas.length}`}
          </Text>
        </View>
      </>
      {/* Separador gradiente */}
      <>
        <LinearGradient
          style={styles.separadorGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          colors={[
            '#1E1E1E',
            '#4EA8DE',
            '#262626',
            '#262626',
            '#8284FA',
            '#1E1E1E',
          ]}
        ></LinearGradient>
      </>
      {/* Lista de tarefas */}
      <>
        {tarefas.length === 0 ? (
          /* A lista de tarefas está vazia */
          <>
            <View style={styles.clipboard}>
              <ClipBoard />
            </View>
            <Text
              style={[
                styles.listaVazia,
                {
                  fontFamily: 'Inter_700Bold',
                },
              ]}
            >
              Você ainda não tem tarefas cadastradas
            </Text>
            <Text style={styles.listaVazia}>
              Crie tarefas e organize seus itens a fazer
            </Text>
          </>
        ) : (
          // Como já existem tarefas, presentar a lista atual de tarefas
          <FlatList
            data={tarefaOrganizada}
            renderItem={({ item }) => (
              <>
                <View style={styles.formLista}>
                  <CheckBox
                    checkedIcon={
                      <FontAwesome
                        name={'check-circle'}
                        size={30}
                        color="#8284FA"
                      />
                    }
                    uncheckedIcon={
                      <FontAwesome
                        name={'circle-thin'}
                        size={30}
                        color="#4EA8DE"
                      />
                    }
                    checked={item.isDone}
                    onPress={() => marcarTarefaCompletada(item.id)}
                  />
                  <View style={styles.contentTarefa}>
                    <Text
                      style={{
                        color: item.isDone ? '#808080' : '#FFF',
                        textDecorationLine: item.isDone
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {item.content}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleDelTarefa(item.id)}
                  >
                    <FontAwesome name={'trash-o'} size={25} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.criadoAt}>
                  {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </>
    </View>
  )
}

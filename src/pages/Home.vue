<template>
  <div
    class="row items-center justify-center q-ma-md"
    style="width: 100vw; height: 100vh"
  >
    <div class="column q-pa-lg">
      <form class="self-center justify-center q-ma-md" @submit="submit">
        <q-card style="width: 60vw; higth: auto" class="justify-center">
          <div class="flex justify-center q-pa-md">
            <q-input style="width: 30vw" label="Nome" v-model="nome" />
            <q-input
              style="width: 30vw"
              label="Data"
              type="date"
              v-model="data"
            />
          </div>
          <div class="flex col justify-end q-pa-md">
            <q-btn
              label="Cadastrar"
              icon="send"
              color="primary"
              type="submit"
            />
          </div>
        </q-card>
      </form>
    </div>

    <div class="column q-pa-lg">
      <form class="self-center justify-center q-ma-md">
        <q-card style="width: 60vw; higth: auto" class="justify-center">
          <q-table :rows="rows" :columns="columns">
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn icon="delete" @click="delete_lembrete(props.row)" />
              </q-td>
            </template>
          </q-table>
        </q-card>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { log } from 'console';
import { computed, onMounted, reactive, ref } from 'vue';
import { lembretes_store } from '../store/lembretes.store';

const nome = ref();
const data = ref();
const store = reactive(lembretes_store());

const columns = [
  {
    name: 'nome',
    label: 'Nome',
    field: (row) => row.nome,
    format: (val) => val,
    sortable: true,
  },
  {
    name: 'data',
    label: 'Data',
    field: (row) => row.data,
    format: (val) => new Date(val).toLocaleDateString('pt-BR'),
    sortable: true,
  },
  {
    name: 'actions',
    label: 'Ações',
  },
];

const rows = computed(() => {
  return store.getLembretes;
});

function submit() {
  const obj = {
    nome: nome.value,
    data: data.value,
    id: String(new Date()),
  };

  store.setLembretes(obj);
}

function delete_lembrete(value: any) {
  console.log(value);
  store.deleteLembrete(value);
}

onMounted(() => {
  localStorage.setItem('lembretes', '[]');
});
</script>

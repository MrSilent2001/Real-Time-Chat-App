<script setup lang="ts">
  import {ref, onMounted} from  'vue';

  const name  = ref("Hello World!");
  const tasks = ref([
    'Simple Auth',
    'Chat history display',
    'Real-time messages',
    'Online user list'
  ]);
  const link = ref("https://vuejs.org/guide/quick-start.html");
  const newTask = ref('');

  const toggle = () =>{
    name.value = name.value === 'Hello World!' ? 'I Love Vue.JS': 'Hello World!'
  }

  const addTask = () =>{
    if (newTask.value.trim() !== ''){
      tasks.value.push(newTask.value);
      newTask.value = '';
    }
  }

  const deleteTask = (index) => {
    tasks.value.splice(index, 1);
  }

  onMounted(async () => {
    try {
      const response = await fetch ('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      tasks.value = data.map((task) => task.title);
    } catch (error) {
      console.log('Error Fetching Task', error);
    }
  });
</script>

<template>
  <h1>{{ name }}</h1> 

  <button @click="toggle">Click Me!</button>

  <h5>Add New Task</h5>
  <form @submit.prevent="addTask">
    <label for="task">Task:</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      <span>{{ task }}</span>
      <button @click="deleteTask(index)">x</button>
    </li>
  </ul>

  <!-- <a v-bind:href="link">Refer Vue.Js Documentation</a> -->
   <a :href="link">Refer Vue.Js Documentation</a>

</template>


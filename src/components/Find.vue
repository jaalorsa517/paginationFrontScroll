<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { J5VIcons } from "@jaalorsa/j5-components-vue"
import { J5VDatalist } from "@jaalorsa/j5-components-vue"
import WrapperFull from "./WrapperFull.vue";
import { getPokemonInfo } from "@/shared/services/Pokemon.service"
import { useRoot } from "@/store/useRoot.store"
import { insertIntoArray } from "@/shared/services/utils.services"

const isOpen = ref(false);
const options = reactive([])
const storeRoot = useRoot();
const router = useRouter();

function onInputValue(value) {
  options.splice(0)
  options.push("Buscando...")
  getPokemonInfo({ id: value.toLocaleLowerCase() })
    .then(
      (pokemon) => {
        options.splice(0)
        const _options = insertIntoArray({
          array: [...options, ...storeRoot.getOptionsSearch],
          value: `# ${pokemon.id} - ${pokemon.name}`
        })
        options.splice(0, _options.length, ..._options)
      }
    )
    .catch(
      () => {
        options.splice(0)
        options.push("Pokemon no encontrado")
      }
    )
}


function onItemSelected(item) {
  storeRoot.addOptionSearch(item);
  const id = item.match(/\d+/g)[0];
  router.push({ name: "Details", params: { id } });
  isOpen.value = false;
}
</script>
<template>
  <div class="find">

    <div class="find__item app__filterItem" @click="isOpen = true">
      <J5VIcons name="find" />
      <span>Buscar</span>
    </div>
    <WrapperFull :is-open="isOpen" title="Buscar Pokemon" @close="isOpen = false">

      <div class="find__search">
        <J5VDatalist class="find__input" :has-icon="true" placeholder="" :options="options" @input-value="onInputValue"
          @item-selected="onItemSelected" />
      </div>
    </WrapperFull>


  </div>
</template>
<style lang="scss">
.find {
  .card {
    padding: .8em .3em;
    border-radius: 4px;
    box-shadow: var(--shadow);
    border-top: inherit;
    width: inherit;
    margin: inherit;
  }

  &__search {
    display: flex;
    justify-content: center;
  }

  &__input {
    --width-input: 90%;
  }

  .j5v-datalist .j5v-datalist__list {
    max-height: 85vh;
  }
}
</style>
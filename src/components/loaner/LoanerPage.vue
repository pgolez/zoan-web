<template>
  <v-container fluid>
    <v-row dense>
      <v-col :cols="4">
          <LoanerTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LoanerTable from './LoanerPageTable'

export default {
	components: {
		LoanerTable
	}
}
</script>

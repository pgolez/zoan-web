<template>
  <v-container fluid>
    <v-row dense>
      <v-col>
        <div>fucking breadcrumbs here</div>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col :cols="12">
        <v-card>
          <v-card-title>Loans</v-card-title>
          <v-data-table :headers="headers" :items="activeLoans" class="elevation-1">

           <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>My CRUD</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>

              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">
                    Draft a new loan
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">New Loan</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form">

                      <BorrowerSelect />
                        <v-text-field
                          v-model="loan.amount"
                          label="Amount"
                          outlined
                          required>
                         </v-text-field>
                        <v-text-field
                          v-model="loan.installmentCount"
                          label="Number of Installments"
                          type="number"
                          outlined
                          required>
                         </v-text-field>
                        <v-text-field
                          v-model="loan.interestRate"
                          label="Monthly Interest Rate"
                          type="number"
                          outlined
                          required>
                         </v-text-field>
                        <v-text-field
                          v-model="loan.fund"
                          label="Fund Source"
                          outlined
                          required>
                         </v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="pb-6 pr-6">
                    <v-spacer></v-spacer>
                    <v-btn outlined>Cancel</v-btn>
                    <v-btn color="primary">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>

          </template>
            <template v-slot:item.monthlyInterest="{ item }">
              <span>{{ `${item.monthlyInterest * 100}%` }}</span>
            </template>

            <template v-slot:item.paid_amount="{ item }">
              <v-progress-linear v-if="item.status === 'ACTIVE'" :value="loanProgress(item)" rounded color="red accent-4">
              </v-progress-linear>
              <v-chip v-else small>{{ item.status }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BorrowerSelect from './LoanFormBorrowerSelect';
import LoanRepository from "@/repositories/loan.repository";

export default {
  components: {
    BorrowerSelect
  },
  data() {
    return {
      headers: [
        { text: "Borrower", sortable: true, value: "borrower.name" },
        { text: "Loan Date", sortable: true, value: "date_loaned" },
        { text: "Interest", sortable: true, value: "monthlyInterest" },
        { text: "# of Installments", sortable: true, value: "installmentCount" },
        { text: "Amount", sortable: true, value: "amount" },
        { text: "Status", sortable: true, value: "paid_amount" }
      ],
      loans: [],
      dialog: false,
      loan: {
        borrower: "",
        amount: null,
        installmentCount: 2,
        interestRate: 0.12,
        fund: ""
      }
    };
  },
  computed: {
    activeLoans() {
      return this.loans.filter( loan => ['ACTIVE', 'DRAFT'].includes(loan.status))
    }
  },
  created() {
    this.fetchLoans();
  },
  methods: {
    async fetchLoans() {
      this.loans = await LoanRepository.list();
    },
    loanProgress(loan) {
      return (loan.paid_amount / loan.amount) * 100;
    },
    loanStatusClassObject(loan) {
      if(loan.status == 'ACTIVE') {
        return 'red accent-4'
      }
    }
  }
};
</script>

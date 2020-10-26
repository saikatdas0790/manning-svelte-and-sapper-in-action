<script lang="ts">
  const MONTHS_PER_YEAR = 12;
  let interestRate: number;
  let loanAmount: number;
  let years: number;

  const calculatePayment = (
    loanAmount: number,
    interestRate: number,
    years: number,
  ): number => {
    if (!loanAmount || !years) return 0;
    const months = years * MONTHS_PER_YEAR;
    if (!interestRate) return loanAmount / months;
    const monthlyInterestRate = interestRate / 100 / MONTHS_PER_YEAR;
    const numerator = loanAmount * monthlyInterestRate;
    const denominator = 1 - (1 + monthlyInterestRate) ** -months;
    return numerator / denominator;
  };

  const reset = (): void => {
    interestRate = 3;
    loanAmount = 2_00_000;
    years = 30;
  };

  reset();

  $: payment = calculatePayment(loanAmount, interestRate, years);
</script>

<label for="loan">Loan Amount</label>
<input type="number" id="loan" bind:value={loanAmount} />

<label for="interest">Interest Rate</label>
<input type="number" id="interest" bind:value={interestRate} />

<label for="years">Years</label>
<input type="number" id="years" bind:value={years} />

<div>Monthly payment: ${payment.toFixed(2)}</div>

<button on:click={reset}>Reset</button>

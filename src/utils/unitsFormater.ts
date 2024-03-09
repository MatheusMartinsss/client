

type converUnitProps = {
    unit: 'meters' | 'm3'
    currentValue: string
    entryValue: string
}

export const convertUnit = ({ unit, currentValue, entryValue }: converUnitProps) => {
    const scale = unit === 'meters' ? 100 : 1000;
    const maxNumberSize = unit === 'meters' ? 5 : 10;
    const decimalCases = unit === 'meters' ? 2 : 3;
    const currentValueFormated = String(currentValue).replace(/\D/g, '')
    const currentValueSize = currentValueFormated.length

    const entryValueFormated = entryValue.replace(/\D/g, '')
    const entryValueSize = String(entryValueFormated).length
    
    if (entryValueSize < currentValueSize) { // Verifies if any number has been erased during input.
        const newValue = (Number(entryValueFormated) / scale).toFixed(decimalCases)
        return newValue
    }
    if (currentValueSize >= maxNumberSize) { // Verifies if the number does not exceed the maximum number size.
        return currentValue
    }
    let formatedValue = `${currentValueFormated}${entryValue.slice(-1)}`
    return (Number(formatedValue) / scale).toFixed(decimalCases)

}


type converUnitProps = {
    unit: 'meters' | 'm3'
    currentValue: string
    entryValue: string
}

export const convertUnit = ({ unit, currentValue, entryValue }: converUnitProps) => {
    const scale = unit === 'meters' ? 100 : 1000
    const maxNumberSize = unit === 'meters' ? 5 : 6

    const currentValueFormated = String(currentValue).replace(/\D/g, '')
    const currentValueSize = currentValueFormated.replace(/0/g, '').length

    const entryValueFormated = entryValue.replace(/\D/g, '')
    const entryValueSize = entryValueFormated.replace(/0/g, '').length

    if (entryValueSize < currentValueSize) { // Verifies if any number has been erased during input.
        const newValue = (Number(entryValueFormated) / scale)
        if (String(newValue).length < maxNumberSize + 1) {
            return `0${newValue}`
        }
    }
    if (currentValueSize >= maxNumberSize) { // Verifies if the number does not exceed the maximum number size.
        return currentValue
    }
    let formatedValue = `${currentValueFormated}${entryValue.slice(-1)}`
    const newValue = (Number(formatedValue) / scale)
    if (String(newValue).length < maxNumberSize + 1) {
        return `0${newValue}`
    }
    return (Number(formatedValue) / scale)

}
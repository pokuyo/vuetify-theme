const getExportValues = requireContextValue => requireContextValue.default || requireContextValue
const getModuleNames = filePath => filePath
  .replace(/^\.\//, '') // 파일 경로 앞단의 ./ 제거
  .replace(/\.js$/, '') // .js 제거
  .split('/') // 경로별로 분할

/**  중첩 모듈을 등록하기 위해 부모 모듈을 탐색하여 모듈을 등록하는 함수
 *   - ex) ./user/inner.js의 파일의 경우 moduleNames는 [user, inner]가 된다.
 *   -     moduleNames의 마지막 요소가 모듈을 등록해야 하는 대상이기 때문에 그 전까지는 재귀를 통해 부모 modules를 탐색한다.
 */
const setModuleRecursive = (moduleNames, exportValues, parentModules) => {
  const moduleName = moduleNames.shift()
  if (moduleNames.length === 0) {
    // eslint-disable-next-line no-param-reassign
    parentModules[moduleName] = {
      namespaced: true,
      ...exportValues,
    }

    return
  }

  // eslint-disable-next-line no-param-reassign
  parentModules[moduleName] = {
    namespaced: true,
    modules: {},
    ...parentModules[moduleName],
  }

  setModuleRecursive(moduleNames, exportValues, parentModules[moduleName].modules)
}

/** modules 내부의 js 파일을 탐색에 modules를 생성하는 함수
 *  - 모듈 이름은 js 파일명과 동일하게 사용된다.
 *  - 중첩모듈은 상위 모듈의 모듈명 폴더 내부에 정의한다.
 */
const makeModules = () => {
  const modules = {}
  const requireContext = require.context(
    './', // 탐색할 root 폴더
    true, // 하위 폴더까지 탐색
    /[^(index)]\.js$/, // 탐색할 정규 표현식 (index를 제외한 js 파일들을 탐색합니다)
  )
  requireContext.keys().forEach(filePath => {
    const exportValues = getExportValues(requireContext(filePath))
    const moduleNames = getModuleNames(filePath)
    setModuleRecursive(moduleNames, exportValues, modules)
  })

  return modules
}

const modules = makeModules()
export default modules

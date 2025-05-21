Feature: Contador de Cliques
  Como um usuário
  Quero poder ver quantas vezes cliquei em um botão
  Para acompanhar minha interação com a página

  Scenario: Incrementar o contador
    Given que estou na página do contador
    When eu vejo o contador com valor "0"
    And eu clico no botão "Clique aqui"
    Then o contador mostra o valor "1"

  Scenario: Zerar o contador
  Given que estou na página do contador
  And que o contador já está com valor "3"
  When eu clico no botão "Zerar"
  Then o contador mostra o valor "0"
const LignCmdFourDetails = (props) => {

    return (
      <tr>
          <td style={{ textAlign: "center" }}>{props.refProduit}</td>
          <td style={{ textAlign: "center" }}>{props.nomProduit}</td>
          <td style={{ textAlign: "center" }}>{props.prix}</td>
          <td style={{ textAlign: "center" }}>{props.quantite}</td>
          <td style={{ textAlign: "center" }}>{props.totalHT}</td>
          <td style={{ textAlign: "center" }}>{props.tva}</td>
          <td style={{ textAlign: "center" }}>{props.totalTTC}</td>
      </tr>
    )
  }
  export default LignCmdFourDetails;
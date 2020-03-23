# coding: latin-1
###############################################################################
# eVotUM - Electronic Voting System
#
# initSigner-app.py
#
# Cripto-7.0.2 - Commmad line app to exemplify the usage of initSigner
#       function (see eccblind.py)
#
# Copyright (c) 2016 Universidade do Minho
# Developed by André Baptista - Devise Futures, Lda. (andre.baptista@devisefutures.com)
# Reviewed by Ricardo Barroso - Devise Futures, Lda. (ricardo.barroso@devisefutures.com)
#
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
#
###############################################################################
"""
Command line app that writes initComponents and pRDashComponents to STDOUT.
"""

import sys
import json
from eVotUM.Cripto import eccblind

def printUsage():
    print("Usage:")
    print("   'python ofusca-app.py -msg <Mensagem> -RDash <pRDashComponents>' - Para obter Blind Message e guardar Blind components e pRComponents")
    print("   <Mensagem> - caminho do ficheiro com a mensagem a ser ofuscada")
    print("   <RDash> - Componentes pRDash")

def parseArgs():
    if(len(sys.argv) != 5):
        printUsage()
    elif(sys.argv[1] == "-msg" and sys.argv[3] == '-RDash'):
        msg = readMessage(sys.argv[2])
        pRDashComponents = sys.argv[4]
        main(msg,pRDashComponents)
    else:
        printUsage()

def readMessage(path):
    with open(path,"r") as f:
        return f.read()

def showResults(errorCode, result):
    print("Output")
    if (errorCode is None):
        blindComponents, pRComponents, blindM = result
        saveComponents(blindM,blindComponents,pRComponents)
        print("Blind message: %s" % blindM)
    elif (errorCode == 1):
        print("Error: pRDash components are invalid")

def saveComponents(bm,bc,prc):
    with open("requerente.json", "r") as f:
        requerente = json.loads(f.read())
    requerente["blindMessage"] = bm
    requerente["pRComponents"] = prc
    requerente["blindComponents"] = bc

    with open("requerente.json", 'w') as f:
        f.write(json.dumps(requerente))

def main(msg,pRDashComponents):
    errorCode, result = eccblind.blindData(pRDashComponents,msg)
    showResults(errorCode,result)

if __name__ == "__main__":
    #main()
    parseArgs()
